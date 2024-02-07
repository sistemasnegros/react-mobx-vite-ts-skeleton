import { injectable } from "inversify";
import { HttpAxiosIns } from "../../../commons/infrastructure/http/http-axios";
import { BaseAPIRepository } from "../../../commons/infrastructure/repository/base.api.repository";
import { IUsersDomain } from "../../domain/users.domain";
import { IUsersRepositoryDomain } from "../../domain/users.repository.domain";

export interface IUsersApiRepository {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verification: Verification;
}

interface Verification {
  email: boolean;
}
@injectable()
export class UsersRepository extends BaseAPIRepository implements IUsersRepositoryDomain {
  private readonly http = HttpAxiosIns;

  constructor() {
    super();
  }

  mapperModelToDomain(model: IUsersApiRepository): IUsersDomain {
    return {
      _id: model._id,
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      role: "standard",
    };
  }

  async findAll(opts: any) {
    const URL = this.genURL("/users");
    const [res, err] = await this.http.get<any>(URL, opts);
    if (!res) {
      return [res, err] as any;
    }

    const data = res.data.data.map((e) => this.mapperModelToDomain(e));
    return [{ ...res, data }, err];
  }

  async create(body: any, opts: any) {
    const URL = this.genURL("/users");
    const [res, err] = await this.http.post<IUsersApiRepository>(URL, body, opts);

    if (!res) {
      return [res, err] as any;
    }

    console.log("RES CREATE", res);

    const data = this.mapperModelToDomain(res.data);
    return [{ ...res, data }, err];
  }

  async deleteById(id: string, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    const [res, err] = await this.http.delete<IUsersApiRepository>(URL, opts);
    if (!res) {
      return [res, err] as any;
    }

    const data = this.mapperModelToDomain(res.data);
    return [{ ...res, data }, err];
  }

  async findById(id: string, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    const [res, err] = await this.http.get<IUsersApiRepository>(URL, opts);

    if (!res) {
      return [res, err] as any;
    }

    const data = this.mapperModelToDomain(res.data);

    return [{ ...res, data }, err];
  }

  async updateById(id: string, body: any, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    const [res, err] = await this.http.put<IUsersApiRepository>(URL, body, opts);
    if (!res) {
      return [res, err] as any;
    }

    const data = this.mapperModelToDomain(res.data);

    return [{ ...res, data }, err];
  }
}
