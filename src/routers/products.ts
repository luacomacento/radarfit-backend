import { Router } from 'express';
import { ProductsController } from '../controllers';
import { ProductsService } from '../services';

const products = Router();
const productsController = new ProductsController(new ProductsService);

products.get('/', (req, res) => productsController.getAll(req, res));
products.get('/find', (req, res) => productsController.search(req, res));
products.get('/:id', (req, res) => productsController.getById(req, res));
products.post('/', (req, res) => productsController.create(req, res));
products.put('/:id', (req, res) => productsController.update(req, res));
products.delete('/:id', (req, res) => productsController.delete(req, res));

export default products;