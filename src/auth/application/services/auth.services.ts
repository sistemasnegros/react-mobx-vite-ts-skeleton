import { inject, injectable } from "inversify";
import { IAuthRepositoryDomain } from "../../domain/auth.repository.domain";
import {
  IAuthService,
  ILoginDtoDomain,
} from "../../domain/auth.service.domain";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("AuthRepository") private repository: IAuthRepositoryDomain
  ) {}

  async login(body: ILoginDtoDomain) {
    return this.repository.login(body) as any;
  }
}
