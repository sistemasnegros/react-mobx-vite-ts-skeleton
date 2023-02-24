import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { ProductService } from "../../../application/product.service";

@injectable()
export class ProductModelView {
  products: any[] = [];

  constructor(
    @inject("ProductService") private readonly service: ProductService
  ) {
    makeAutoObservable(this);
  }

  async findAll() {
    const products = await this.service.findAll();
    this.setProducts(products);
  }

  setProducts(products: any) {
    this.products = products;
  }

  deleteProduct(index: number) {
    this.products = this.products.filter((e, i) => i !== index);
  }

  createProduct() {
    const product = {
      name: "Golem",
      price: 2,
      img: "https://i.ebayimg.com/thumbs/images/g/0AwAAOSwq3NhbgsR/s-l300.jpg",
    };
    this.products.push(product);
  }
}
