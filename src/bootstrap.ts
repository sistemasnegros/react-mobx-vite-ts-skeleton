import "reflect-metadata";
import { Container } from "inversify";
import { AuthFakeRepository } from "./auth/infrastructure/repository/auth-fake.api.repository";
import { LoginFormViewModel } from "./auth/infrastructure/ui/view-models/loginForm.view-model";
import { AuthService } from "./auth/application/services/auth.services";
import { AuthRepository } from "./auth/infrastructure/repository/auth.api.repository";
import { IAuthRepositoryDomain } from "./auth/domain/auth.repository.domain";
import { UsersService } from "./users/application/services/users.services";
import { UsersRepository } from "./users/infrastructure/repository/users.api.repository";
import { UsersViewModel } from "./users/infrastructure/ui/view-models/users.view-model";
import { IUsersRepositoryDomain } from "./users/domain/users.repository.domain";

export const container = new Container();

// auth
container.bind<IAuthRepositoryDomain>("AuthRepository").to(AuthFakeRepository).inSingletonScope();

container.bind<AuthService>("AuthService").to(AuthService).inSingletonScope();

container.bind<LoginFormViewModel>("LoginFormViewModel").to(LoginFormViewModel).inSingletonScope();

// users
container.bind<UsersService>("UsersService").to(UsersService).inSingletonScope();

container.bind<IUsersRepositoryDomain>("UsersRepository").to(UsersRepository).inSingletonScope();

container.bind<UsersViewModel>("UsersViewModel").to(UsersViewModel).inSingletonScope();
