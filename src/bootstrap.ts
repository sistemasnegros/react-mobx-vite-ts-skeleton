import "reflect-metadata";
import { Container } from "inversify";
import { AuthFakeRepository } from "./auth/infrastructure/repository/auth-fake.api.repository";
import { LoginFormViewModel } from "./auth/infrastructure/ui/view-models/loginForm.view-model";
import { ProductService } from "./product/application/product.service";
import { ProductRepository } from "./product/infrastructure/respository/products.repository";
import { ProductModelView } from "./product/infrastructure/ui/view-model/product.view-model";
import { AuthService } from "./auth/application/services/auth.services";
import { AuthRepository } from "./auth/infrastructure/repository/auth.api.repository";
import { IAuthRepositoryDomain } from "./auth/domain/auth.repository.domain";

export const container = new Container();

// auth
container
  .bind<IAuthRepositoryDomain>("AuthRepository")
  .to(AuthRepository)
  .inSingletonScope();

container.bind<AuthService>("AuthService").to(AuthService).inSingletonScope();

container
  .bind<LoginFormViewModel>("LoginFormViewModel")
  .to(LoginFormViewModel)
  .inSingletonScope();

// products
container
  .bind<ProductService>("ProductService")
  .to(ProductService)
  .inSingletonScope();

container
  .bind<ProductRepository>("ProductRepository")
  .to(ProductRepository)
  .inSingletonScope();

container
  .bind<ProductModelView>("ProductModelView")
  .to(ProductModelView)
  .inSingletonScope();
