import { inject, injectable } from "inversify";
import { ProductRepository } from "../infrastructure/respository/products.repository";

@injectable()
export class ProductService {
  constructor(
    @inject("ProductRepository") private readonly repository: ProductRepository
  ) {}

  findAll() {
    return this.repository.findAll();
  }
}
