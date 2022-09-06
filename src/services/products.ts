import Produto from "../database/models/Produto";

class ProductsService {
  public async getAll() {
    const products = await Produto.findAll();
    return products;
  }

}

export default ProductsService;