import { injectable } from "inversify";
import { HttpAxiosIns } from "../../../commons/infrastructure/http/http-axios";
import { BaseAPIRepository } from "../../../commons/infrastructure/repository/base.api.repository";
import { IUsersDomain } from "../../domain/users.domain";
import { IUsersRepositoryDomain } from "../../domain/users.repository.domain";

export interface IUsersApiRepository {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@injectable()
export class UsersRepository
  extends BaseAPIRepository
  implements IUsersRepositoryDomain
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

  async findAll(opts: any) {
    const URL = this.genURL("/users");
    const [res, err] = await this.http.get<IUsersApiRepository[]>(URL, opts);
    if (!res) {
      return [res, err] as any;
    }

    res.data = res.data.map((e) => this.mapperModelToDomain(e));
    return [res, err];
  }

  async create(body: any, opts: any) {
    const URL = this.genURL("/users");
    const [res, err] = await this.http.post<IUsersApiRepository>(
      URL,
      body,
      opts
    );

    if (!res) {
      return [res, err] as any;
    }

    res.data = this.mapperModelToDomain(res.data);
    return [res, err];
  }

  async deleteById(id: string, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    const [res, err] = await this.http.delete<IUsersApiRepository>(URL, opts);
    if (!res) {
      return [res, err] as any;
    }

    res.data = this.mapperModelToDomain(res.data);
    return [res, err];
  }

  async findById(id: string, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    const [res, err] = await this.http.get<IUsersApiRepository>(URL, opts);

    if (!res) {
      return [res, err] as any;
    }

    res.data = this.mapperModelToDomain(res.data);

    return [res, err];
  }

  async updateById(id: string, body: any, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    const [res, err] = await this.http.put<IUsersApiRepository>(
      URL,
      body,
      opts
    );
    if (!res) {
      return [res, err] as any;
    }

    res.data = this.mapperModelToDomain(res.data);

    return [res, err];
  }
}
