import { injectable } from "inversify";
import productsJson from "./products.json";

@injectable()
export class ProductRepository {
  async findAll() {
    return productsJson;
  }
}
