import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ProductsController } from '../../../controllers';
import Produto from '../../../database/models/Produto';
import { ProductsService } from '../../../services';

chai.use(chaiAsPromised);
chai.use(sinonChai);

const mockedProduct = {
  id: 1,
  produto: 'nome',
  descricao: 'descricao'
} as Produto;

describe('controllers/productsController', () => {
  let req = {} as Request;
  let res = {} as Response;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
  })

  const mockedService = sinon.stub(ProductsService) as unknown as ProductsService;
  const productsController = new ProductsController(mockedService);

  describe('#getAll', () => {
    it('should throw if service throws', async () => {
      mockedService.getAll = sinon.stub().rejects();

      return expect(productsController.getAll(req, res))
        .to.eventually.be.rejected;
    });

    it('should return status 200 when service returns', async () => {
      mockedService.getAll = sinon.stub().resolves([{}]);

      await productsController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return array of products when service returns', async () => {
      mockedService.getAll = sinon.stub().resolves([mockedProduct]);

      await productsController.getAll(req, res);
      expect(res.json).to.have.been.calledWith([mockedProduct]);
    });
  });

  describe('#getById', () => {
    beforeEach(() => {
      req.params = { id: '1'};
    });
    
    it('should throw if service throws', async () => {
      mockedService.getById = sinon.stub().rejects();

      return expect(productsController.getById(req, res))
        .to.eventually.be.rejected;
    });

    it('should return status 200 when service returns', async () => {
      mockedService.getById = sinon.stub().resolves({});

      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return a single product when service returns', async () => {
      mockedService.getById = sinon.stub().resolves(mockedProduct);

      await productsController.getById(req, res);
      expect(res.json).to.have.been.calledWith(mockedProduct);
    });
  });

  describe('#search', () => {
    beforeEach(() => {
      req.query = { q: 'test'};
    });
    
    it('should throw if service throws', async () => {
      mockedService.search = sinon.stub().rejects();

      return expect(productsController.search(req, res))
        .to.eventually.be.rejected;
    });

    it('should return status 200 when service returns', async () => {
      mockedService.search = sinon.stub().resolves([{}]);

      await productsController.search(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return array of products when service returns', async () => {
      mockedService.search = sinon.stub().resolves([mockedProduct]);

      await productsController.search(req, res);
      expect(res.json).to.have.been.calledWith([mockedProduct]);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      req.query = { q: 'test'};
    });
    
    it('should throw if service throws', async () => {
      mockedService.create = sinon.stub().rejects();

      return expect(productsController.create(req, res))
        .to.eventually.be.rejected;
    });

    it('should return status 201 when service returns', async () => {
      mockedService.create = sinon.stub().resolves({});

      await productsController.create(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });

    it('should return a single product when service returns', async () => {
      mockedService.create = sinon.stub().resolves(mockedProduct);

      await productsController.create(req, res);
      expect(res.json).to.have.been.calledWith(mockedProduct);
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      req.params = { id: '1'};
      res.end = sinon.stub().returns(res);
    });
    
    it('should throw if service throws', async () => {
      mockedService.delete = sinon.stub().rejects();

      return expect(productsController.delete(req, res))
        .to.eventually.be.rejected;
    });

    it('should return status 204 when service returns', async () => {
      mockedService.delete = sinon.stub().resolves({});

      await productsController.delete(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });

    it('should call end() with no parameters when done', async () => {
      mockedService.delete = sinon.stub().resolves(mockedProduct);

      await productsController.delete(req, res);
      expect(res.end).to.have.been.calledWith();
    });
  });

  describe('#update', () => {
    beforeEach(() => {
      req.params = { id: '1'};
    });
    
    it('should throw if update service throws', async () => {
      mockedService.update = sinon.stub().rejects();
      mockedService.getById = sinon.stub().resolves({});

      return expect(productsController.update(req, res))
        .to.eventually.be.rejected;
    });

    it('should throw if getById service throws', async () => {
      mockedService.update = sinon.stub().resolves(true);
      mockedService.getById = sinon.stub().rejects();

      return expect(productsController.update(req, res))
        .to.eventually.be.rejected;
    });

    it('should return status 200 when services return', async () => {
      mockedService.update = sinon.stub().resolves(true);
      mockedService.getById = sinon.stub().resolves(mockedProduct);

      await productsController.update(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should call end() with no parameters when done', async () => {
      mockedService.update = sinon.stub().resolves(true);
      mockedService.getById = sinon.stub().resolves(mockedProduct);

      await productsController.update(req, res);
      expect(res.json).to.have.been.calledWith(mockedProduct);
    });
  });
})