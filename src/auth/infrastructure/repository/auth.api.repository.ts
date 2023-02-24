import { HttpAxiosIns } from "../../../commons/infrastructure/http/http-axios";
import { BaseAPIRepositoriy } from "../../../commons/infrastructure/repository/base.api.repository";

class AuthRepository extends BaseAPIRepositoriy {
  private readonly http: typeof HttpAxiosIns;

  constructor(http: typeof HttpAxiosIns) {
    super();
    this.http = http;
  }

  async login(body: any) {
    const API_LOGIN = "/login";
    try {
      const res = await this.http.post(API_LOGIN, body);
      return [res.data, null];
    } catch (e: any) {
      return [null, e.response.data];
    }
  }
}

export const AuthRepositoryIns = new AuthRepository(HttpAxiosIns);
