import { IUsersDomain } from "../../../users/domain/users.domain";

export interface ILoginRequestDomain {
  email: string;
  password: string;
}

export type IReturnRepositoryDomain<T> = [T, null | string];

export type ILoginRepositoryDomain = IReturnRepositoryDomain<ILoginResponse>;

export interface ILoginResponse {
  user: IUsersDomain;
  token: string;
}

export interface IAuthRepositoryDomain {
  login(
    loginDto: ILoginRequestDomain
  ): Promise<IReturnRepositoryDomain<ILoginResponse>>;
}
