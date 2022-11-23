// import axios from "axios";
import { HttpAxiosIns } from "../../commons/infrastructure/http/http-axios";
import { sleep } from "../../commons/lib/utils";
import { BaseAPIRepositoriy } from "../../commons/repository/base.api.repository";

class AuthRepository extends BaseAPIRepositoriy {
  private readonly http: typeof HttpAxiosIns;

  constructor(http: typeof HttpAxiosIns) {
    super();
    this.http = http;
  }

  async loginFake(body: any): Promise<any[]> {
    return new Promise(async (resolve) => {
      await sleep(3000);
      const data = {
        token: "tokenFake",
        user: {
          email: body.email,
          firstName: "Alejandro",
          lastName: "Franco",
          fullName: "Alejandro Franco",
          role: "standard",
        },
      };
      return resolve([data, null]);
    });
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
