import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { NotFoundError } from '../../../errors';
import { errorMiddleware } from '../../../middlewares';

chai.use(sinonChai);

describe('middlewares/errorMiddleware', () => {
  let req = {} as Request;
  let res = {} as Response;
  let next:NextFunction = () => {};

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
  })

  describe('#errorMiddleware', () => {
    it('should return status 500 if error doesn\'t have a status code', async () => {
      const error = new Error('error');
      await errorMiddleware(error, req, res, next);
      expect(res.status).to.have.been.calledWith(500);
    });

    it('should return specific status if error have its own status code', async () => {
      // NotFoundError is a custom error that extends Error and has a status code on error.status
      const error = new NotFoundError('error');

      errorMiddleware(error, req, res, next);
      expect(res.status).to.have.been.calledWith(error.status);
    });

    it('should return the error message inside an object', async () => {
      const error = new Error('Custom error message');

      errorMiddleware(error, req, res, next);
      expect(res.json).to.have.been.calledWith({ message: error.message });
    });
  });
})