import { IReturnRepository } from "../../commons/domain/commons.repository.domain";
import { IUsersDomain } from "../../users/domain/users.domain";

// dto login input
export interface ILoginRequestDomain {
  email: string;
  password: string;
}

// promise login data
interface ILoginResponseRepository {
  user: IUsersDomain;
  token: string;
}

// dto login output
export type ILoginReturnRepositoryDomain =
  IReturnRepository<ILoginResponseRepository>;

// contract service
export interface IAuthRepositoryDomain {
  login(loginDto: ILoginRequestDomain): Promise<ILoginReturnRepositoryDomain>;
}
