import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { ProductRepositoryIns } from "../respository/products.repository";

export class ProductService {
  @observable products: any[] = [];

  repository: typeof ProductRepositoryIns;

  constructor(repository: typeof ProductRepositoryIns) {
    // makeAutoObservable(this);
    makeObservable(this);

    this.repository = repository;
  }

  async findAll() {
    const products = await this.repository.findAll();
    this.setProducts(products);
  }

  @action
  setProducts(products: any) {
    this.products = products;
  }

  @action
  deleteProduct(index: number) {
    this.products = this.products.filter((e, i) => i !== index);
  }

  @action
  createProduct() {
    const product = {
      name: "Golem",
      price: 2,
      img: "https://i.ebayimg.com/thumbs/images/g/0AwAAOSwq3NhbgsR/s-l300.jpg",
    };
    this.products.push(product);
  }
}

export const ProductServiceIns = new ProductService(ProductRepositoryIns);
