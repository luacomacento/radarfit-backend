import { Request, Response } from "express";
import { ProductsService } from "../services";

class ProductsController {
  private _productsService;

  constructor(productsService: ProductsService) {
    this._productsService = productsService;
  }

  public async getAll(_req: Request, res: Response) {
    const products = await this._productsService.getAll();
    res.status(200).json(products);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await this._productsService.getById(Number(id));
    res.status(200).json(product);
  }
}

export default ProductsController;