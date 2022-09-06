import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

class Validation {
  public validateFullProduct(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      produto: Joi.string().required(),
      valor: Joi.number().required(),
      descricao: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
  
    next();
  };

  public validatePartialProduct(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      produto: Joi.string(),
      valor: Joi.number(),
      descricao: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
  
    next();
  };

}

export default Validation;