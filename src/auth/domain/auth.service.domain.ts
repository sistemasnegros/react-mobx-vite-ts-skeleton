import { IReturnRepository } from "../../commons/domain/commons.repository.domain";
import { IUsersDomain } from "../../users/domain/users.domain";

export interface ILoginDtoDomain {
  email: string;
  password: string;
}

// promise login data
interface ILoginResponseService {
  user: IUsersDomain;
  token: string;
}

// dto login output
export type ILoginReturnServiceDomain =
  IReturnRepository<ILoginResponseService>;

export interface IAuthService {
  login(body: ILoginDtoDomain): Promise<ILoginReturnServiceDomain>;
}
