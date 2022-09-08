import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import Produto from '../../../database/models/Produto';
import { NotFoundError } from '../../../errors';
import { ProductsService } from '../../../services';

chai.use(chaiAsPromised);

const mockedProduct = {
  id: 1,
  produto: 'nome',
  descricao: 'descricao'
} as Produto;

describe('services/productsService', () => {
  const productsService = new ProductsService();
  describe('#getAll', () => {
    beforeEach(()=> {
      sinon.restore();
    });
    
    it('should throw if query throws', async () => {
      sinon.stub(Produto, 'findAll').rejects();
      return expect(productsService.getAll()).to.eventually.be.rejected;
    });

    it('should return an empty array if there are no products', async () => {
      sinon.stub(Produto, 'findAll').resolves([] as Produto[]);
      return expect(productsService.getAll()).to.eventually.deep.equal([]);
    });

    it('should return array of products if query succeeds', async () => {
      sinon.stub(Produto, 'findAll').resolves([mockedProduct]);
      return expect(productsService.getAll()).to.eventually.deep.equal([mockedProduct]);
    });
  });

  describe('#getById', () => {
    beforeEach(()=> {
      sinon.restore();
    });
    
    it('should throw if query throws', async () => {
      sinon.stub(Produto, 'findByPk').rejects();
      return expect(productsService.getById(1)).to.eventually.be.rejected;
    });

    it('should throw NotFoundError if there are no products with that PK', async () => {
      sinon.stub(Produto, 'findByPk').resolves(null);
      return expect(productsService.getById(1))
        .to.eventually.be.rejectedWith('Produto não encontrado')
        .and.be.an.instanceOf(NotFoundError);
    }); 

    it('should return a single product if query succeeds', async () => {
      sinon.stub(Produto, 'findByPk').resolves(mockedProduct);
      return expect(productsService.getById(1)).to.eventually.deep.equal(mockedProduct);
    });
  });

  describe('#search', () => {
    beforeEach(()=> {
      sinon.restore();
    });
    
    it('should throw if query throws', async () => {
      sinon.stub(Produto, 'findAll').rejects();
      return expect(productsService.search('string')).to.eventually.be.rejected;
    });

    it('should return an empty array if there are no products to show', async () => {
      sinon.stub(Produto, 'findAll').resolves([] as Produto[]);
      return expect(productsService.search('string')).to.eventually.deep.equal([]);
    });

    it('should return array of products if query succeeds', async () => {
      sinon.stub(Produto, 'findAll').resolves([mockedProduct]);
      return expect(productsService.search('string')).to.eventually.deep.equal([mockedProduct]);
    });
  });

  describe('#create', () => {
    beforeEach(()=> {
      sinon.restore();
    });
    
    it('should throw if query throws', async () => {
      sinon.stub(Produto, 'create').rejects();
      return expect(productsService.create({} as Produto)).to.eventually.be.rejected;
    });

    it('should return a single product if query succeeds', async () => {
      sinon.stub(Produto, 'create').resolves(mockedProduct);
      return expect(productsService.create({} as Produto)).to.eventually.deep.equal(mockedProduct);
    });
  });

  describe('#delete', () => {
    beforeEach(()=> {
      sinon.restore();
    });
    
    it('should throw if query throws', async () => {
      sinon.stub(Produto, 'destroy').rejects();
      return expect(productsService.delete(1)).to.eventually.be.rejected;
    });

    it('should throw NotFoundError if query returns 0', async () => {
      sinon.stub(Produto, 'destroy').resolves(0);
      return expect(productsService.delete(1))
        .to.eventually.be.rejectedWith('Produto não encontrado')
        .and.be.an.instanceOf(NotFoundError);
    }); 

    it('should return true if query returns 1', async () => {
      sinon.stub(Produto, 'destroy').resolves(1);
      return expect(productsService.delete(1)).to.eventually.equal(true);
    });
  });

  describe('#update', () => {
    beforeEach(()=> {
      sinon.restore();
    });
    
    it('should throw if query throws', async () => {
      sinon.stub(Produto, 'update').rejects();
      return expect(productsService.update(1, mockedProduct))
        .to.eventually.be.rejected;
    });

    it('should return false if query returns [0]', async () => {
      sinon.stub(Produto, 'update').resolves([0]);
      return expect(productsService.update(1, mockedProduct))
        .to.eventually.equal(false);
    }); 

    it('should return true if query returns [1]', async () => {
      sinon.stub(Produto, 'update').resolves([1]);
      return expect(productsService.update(1, mockedProduct))
        .to.eventually.equal(true);
    });
  });
})