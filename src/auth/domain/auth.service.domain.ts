import { IReturnDomain } from "../../commons/domain/commons.repository.domain";
import { IResponse } from "../../commons/infrastructure/http/http-axios";
import { IUsersDomain } from "../../users/domain/users.domain";

export interface ILoginDtoDomain {
  email: string;
  password: string;
}

interface ILoginResponseService {
  user: IUsersDomain;
  token: string;
}

export interface IAuthService {
  login(
    body: ILoginDtoDomain
  ): Promise<IReturnDomain<IResponse<ILoginResponseService>, IResponse<any>>>;
}
