import { inject, injectable } from "inversify";
import { IUsersDomain } from "../../../users/domain/users.domain";
import {
  IAuthRepositoryDomain,
  ILoginResponse,
} from "../repository/auth.repository.domain";

interface IAuthService {
  login(body: any): Promise<any[]>;
}

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("AuthRepository") private repository: IAuthRepositoryDomain
  ) {}

  async login(body: any) {
    const [res, err] = await this.repository.login(body);

    if (err) {
      return [null, err];
    }

    // adapter
    const token = res.token;
    const user = (user: any): IUsersDomain => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
    });

    return [{ user: user(res.user), token }, null];
    // return [res, null];
  }
}
