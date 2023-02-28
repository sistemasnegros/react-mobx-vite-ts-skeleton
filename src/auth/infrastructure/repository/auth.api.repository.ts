import { injectable } from "inversify";
import { HttpAxiosIns } from "../../../commons/infrastructure/http/http-axios";
import { BaseAPIRepository } from "../../../commons/infrastructure/repository/base.api.repository";
import {
  IAuthRepositoryDomain,
  ILoginRequestDomain,
  ILoginReturnRepositoryDomain,
} from "../../domain/auth.repository.domain";

@injectable()
export class AuthRepository
  extends BaseAPIRepository
  implements IAuthRepositoryDomain
{
  private readonly http = HttpAxiosIns;

  constructor() {
    super();
  }

  async login(body: ILoginRequestDomain) {
    const API_LOGIN = this.genURL("/auth/login");
    try {
      const res = await this.http.post(API_LOGIN, body);
      return [res.data, null] as ILoginReturnRepositoryDomain;
    } catch (e: any) {
      console.log("Error in request: ", e);
      return [null, e.response.data] as ILoginReturnRepositoryDomain;
    }
  }
}
