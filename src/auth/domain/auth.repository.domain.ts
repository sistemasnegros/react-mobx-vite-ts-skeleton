import { IReturnDomain } from "../../commons/domain/commons.repository.domain";
import { IResponse } from "../../commons/infrastructure/http/http-axios";
import { IUsersDomain } from "../../users/domain/users.domain";

// dto login input
export interface ILoginRequestDomain {
  email: string;
  password: string;
}

// promise login data
interface ILoginReturnDomain {
  user: IUsersDomain;
  token: string;
}

// contract service
export interface IAuthRepositoryDomain {
  login(
    loginDto: ILoginRequestDomain
  ): Promise<IReturnDomain<IResponse<ILoginReturnDomain>, IResponse<any>>>;
}
