import { injectable } from "inversify";
import { HttpAxiosIns } from "../../../commons/infrastructure/http/http-axios";
import { BaseAPIRepository } from "../../../commons/infrastructure/repository/base.api.repository";
import { IUsersDomain } from "../../../users/domain/users.domain";
import {
  IAuthRepositoryDomain,
  ILoginRequestDomain,
} from "../../domain/auth.repository.domain";

export interface IUsersApiRepository {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ILoginApiResponseRepository {
  user: IUsersApiRepository;
  token: string;
}

@injectable()
export class AuthRepository
  extends BaseAPIRepository
  implements IAuthRepositoryDomain
{
  private readonly http = HttpAxiosIns;

  constructor() {
    super();
  }

  mapperModelToDomain(model: IUsersApiRepository): IUsersDomain {
    return {
      id: model.id,
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      role: "standard",
    };
  }

  async login(body: ILoginRequestDomain) {
    const url = this.genURL("/auth/login");
    const [res, err] = await this.http.post<ILoginApiResponseRepository>(
      url,
      body
    );

    if (!res) {
      return [res, err] as any;
    }

    res.data.user = this.mapperModelToDomain(res.data.user);

    return [res, err];
  }
}
