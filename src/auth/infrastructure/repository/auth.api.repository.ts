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
    const url = this.genURL("/auth/login");
    const [res, err] = await this.http.post(url, body);
    return [res.data, err] as ILoginReturnRepositoryDomain;
  }
}
