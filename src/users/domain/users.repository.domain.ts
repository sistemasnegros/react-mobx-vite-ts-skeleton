import { IResponse } from "../../commons/infrastructure/http/http-axios";
import { IUsersDomain } from "./users.domain";

type IReturnDomain<T, K> = [T, null] | [null, K];

export interface IUsersRepositoryDomain {
  findById(
    id: string,
    opts: any
  ): Promise<IReturnDomain<IResponse<IUsersDomain>, IResponse<any>>>;
  create(
    body: any,
    opts: any
  ): Promise<IReturnDomain<IResponse<IUsersDomain>, IResponse<any>>>;
  findAll(
    opts: any
  ): Promise<IReturnDomain<IResponse<IUsersDomain[]>, IResponse<any>>>;
  deleteById(
    id: string,
    opts: any
  ): Promise<IReturnDomain<IResponse<IUsersDomain>, IResponse<any>>>;
  updateById(
    id: string,
    body: any,
    opts: any
  ): Promise<IReturnDomain<IResponse<IUsersDomain>, IResponse<any>>>;
}
