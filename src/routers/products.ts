import { Router } from 'express';
import { ProductsController } from '../controllers';
import { ProductsService } from '../services';
import { validationMiddlewares } from '../middlewares';

const products = Router();
const productsController = new ProductsController(new ProductsService);
const { validateFullProduct, validatePartialProduct } = validationMiddlewares;

products.get('/', (req, res) => productsController.getAll(req, res));
products.get('/find', (req, res) => productsController.search(req, res));
products.get('/:id', (req, res) => productsController.getById(req, res));

products.post(
  '/',
  validateFullProduct,
  (req, res) => productsController.create(req, res)
);

products.put(
  '/:id',
  validateFullProduct,
  (req, res) => productsController.update(req, res)
);

products.patch(
  '/:id',
  validatePartialProduct,
  (req, res) => productsController.update(req, res)
);

products.delete('/:id', (req, res) => productsController.delete(req, res));

export default products;