import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

class Validation {
  public async validateFullProduct(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      produto: Joi.string().required(),
      valor: Joi.number().required(),
      descricao: Joi.string().required(),
    });

    await schema.validateAsync(req.body);
  
    next();
  };

  public async validatePartialProduct(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      produto: Joi.string(),
      valor: Joi.number(),
      descricao: Joi.string(),
    });

    await schema.validateAsync(req.body);
  
    next();
  };

}

export default Validation;