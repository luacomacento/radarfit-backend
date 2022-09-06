import { Op } from "sequelize";
import Produto from "../database/models/Produto";

class ProductsService {
  public async getAll() {
    const products = await Produto.findAll();
    return products;
  }

  public async getById(id: number) {
    const products = await Produto.findByPk(id);
    return products;
  }

  public async search(query: string) {
    const products = await Produto.findAll({
      where: {
        produto: {
          [Op.like]: `%${query}%`
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
    return !!success;
  }

  public async update(id: number, product: Produto) {
    await Produto.update({...product}, { where: { id }});
    const updatedProduct = await Produto.findByPk(id);
    return updatedProduct;
  }
}

export default ProductsService;