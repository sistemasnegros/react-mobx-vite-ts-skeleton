import productsJson from "./products.json";

class ProductRepository {
  async findAll() {
    return productsJson;
  }
}

export const ProductRepositoryIns = new ProductRepository();
