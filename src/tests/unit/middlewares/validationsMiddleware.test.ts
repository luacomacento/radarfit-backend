import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Validation from '../../../middlewares/validations';

chai.use(sinonChai);

describe('middlewares/validationsMiddleware', () => {
  let req = {} as Request;
  let res = {} as Response;
  let next = sinon.stub();
  const validations = new Validation();

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
  });

  describe('#validateFullProduct', () => {
    it('should throw if "produto" is missing', async () => {
      req.body = {
        valor: 10,
        descricao: 'test'
      };

      return expect(validations.validateFullProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should throw if "valor" is missing', async () => {
      req.body = {
        produto: 'test',
        descricao: 'test'
      };

      return expect(validations.validateFullProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should throw if "descricao" is missing', async () => {
      req.body = {
        produto: 'test',
        valor: 10
      };

      return expect(validations.validateFullProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should throw if "produto" is not string', async () => {
      req.body = {
        produto: 999,
        valor: 10,
        descricao: 'test'
      };

      return expect(validations.validateFullProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should throw if "valor" is not number', async () => {
      req.body = {
        produto: 'test',
        valor: 'abc',
        descricao: 'test'
      };

      return expect(validations.validateFullProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should throw if "descricao" is not string', async () => {
      req.body = {
        produto: 'test',
        valor: 10,
        descricao: 999
      };

      return expect(validations.validateFullProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should call next if validation succeeds', async () => {
      req.body = {
        produto: 'test',
        valor: 10,
        descricao: 'test'
      };

      await validations.validateFullProduct(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('#validatePartialProduct', () => {
    it('should throw if "produto" is not string', async () => {
      req.body = {
        produto: 999,
        valor: 10,
        descricao: 'test'
      };

      return expect(validations.validatePartialProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should throw if "valor" is not number', async () => {
      req.body = {
        produto: 'test',
        valor: 'abc',
        descricao: 'test'
      };

      return expect(validations.validatePartialProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should throw if "descricao" is not string', async () => {
      req.body = {
        produto: 'test',
        valor: 10,
        descricao: 999
      };

      return expect(validations.validatePartialProduct(req, res, next))
        .to.eventually.be.rejected
        .and.be.an.instanceOf(ValidationError);
    });

    it('should call next if validation succeeds', async () => {
      req.body = {
        produto: 'test',
        valor: 10,
        descricao: 'test'
      };

      await validations.validatePartialProduct(req, res, next);
      expect(next).to.have.been.called;
    });
  });
})