import { injectable } from "inversify";
import { HttpAxiosIns } from "../../../commons/infrastructure/http/http-axios";
import { BaseAPIRepository } from "../../../commons/infrastructure/repository/base.api.repository";

@injectable()
export class UsersRepository extends BaseAPIRepository {
  private readonly http = HttpAxiosIns;

  constructor() {
    super();
  }

  async findAll(opts: any) {
    const URL = this.genURL("/users");
    return this.http.get(URL, opts);
  }

  async create(body: any, opts: any) {
    const URL = this.genURL("/users");
    return this.http.post(URL, body, opts);
  }

  async deleteById(id: string, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    return this.http.delete(URL, opts);
  }

  async findById(id: string, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    return this.http.get(URL, opts);
  }

  async updateById(id: string, body: any, opts?: any) {
    const URL = this.genURL(`/users/${id}`);
    return this.http.put(URL, body, opts);
  }
}
