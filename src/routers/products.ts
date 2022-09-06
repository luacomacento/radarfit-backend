import { Router } from 'express';
import { ProductsController } from '../controllers';
import { ProductsService } from '../services';

const products = Router();
const productsController = new ProductsController(new ProductsService);

products.get('/', (req, res) => productsController.getAll(req, res));

export default products;