import { HttpAxiosIns } from "@/commons/infrastructure/http/http-axios";
import { LocalStoreRepositoryIst } from "../../commons/repository/local-store.repository";
import { UsersDomain } from "../../users/domain/users.domain";
import { AuthRepositoryIns } from "../repository/auth.api.repository";

class AuthService {
  repository: typeof AuthRepositoryIns;
  localStorageRepository: typeof LocalStoreRepositoryIst;
  keyToken = "reactJwtToken";

  constructor() {
    this.repository = AuthRepositoryIns;
    this.localStorageRepository = LocalStoreRepositoryIst;
  }

  async login(body: any) {
    const [res, err] = await this.repository.loginFake(body);
    console.log(res, err);
    if (err) {
      return [res, err];
    }

    // adactater
    const token = res.token;
    const user = (user: any): UsersDomain => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
    });

    HttpAxiosIns.setToken(token);

    return [{ user: user(res.user), token }, null];
  }

  SetTokenLocalStore(token: any) {
    this.localStorageRepository.save({
      key: this.keyToken,
      value: token,
    });
  }

  getTokenLocalStore() {
    const token = this.localStorageRepository.load({ key: this.keyToken });
    return token ? JSON.parse(token) : null; // if is object
  }

  logout() {
    this.localStorageRepository.delete({ key: this.keyToken });
  }
}

export const AuthServiceIns = new AuthService();
