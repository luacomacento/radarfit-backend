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
}

export default ProductsService;