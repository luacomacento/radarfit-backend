import { Request, Response } from "express";
import Produto from "../database/models/Produto";
import { IProductsService } from "../interfaces";

class ProductsController {
  private _productsService;

  constructor(productsService: IProductsService<Produto>) {
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

  public async search(req: Request, res: Response) {
    const { q: query } = req.query;
    const products = await this._productsService.search(query as string);
    res.status(200).json(products);
  }

  public async create(req: Request, res: Response) {
    const productToCreate = req.body as Produto;
    const product = await this._productsService.create(productToCreate);
    res.status(201).json(product);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._productsService.delete(Number(id));
    res.status(204).end();
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const product = req.body as Produto;
    await this._productsService.update(Number(id), product);
    const updatedProduct = await this._productsService.getById(Number(id));
    res.status(200).json(updatedProduct);
  }
}

export default ProductsController;