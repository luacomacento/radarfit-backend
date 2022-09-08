import { Op } from "sequelize";
import Produto from "../database/models/Produto";
import { NotFoundError } from "../errors";
import { IProductsService } from "../interfaces";

class ProductsService implements IProductsService<Produto> {
  public async getAll() {
    const products = await Produto.findAll();
    return products;
  }

  public async getById(id: number) {
    const product = await Produto.findByPk(id);

    if (!product) throw new NotFoundError("Produto não encontrado");

    return product;
  }

  public async search(query: string) {
    const products = await Produto.findAll({
      where: {
        produto: {
          [Op.iLike]: `%${query}%`
        }
      },
    });
    return products;
  }

  public async create(product: Produto) {
    const newProduct = await Produto.create({...product});
    return newProduct;
  }

  public async delete(id: number) {
    const success = await Produto.destroy({ where: { id }});
    if (!success) throw new NotFoundError("Produto não encontrado");
    return !!success;
  }

  public async update(id: number, product: Produto) {
    const [success] = await Produto.update({...product}, { where: { id }});
    return !!success;
  }
}

export default ProductsService;