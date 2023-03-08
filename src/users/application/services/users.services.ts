import { inject, injectable } from "inversify";
import { generateUUID } from "../../../commons/lib/utils";
import { IUsersRepositoryDomain } from "../../domain/users.repository.domain";

@injectable()
export class UsersService {
  constructor(
    @inject("UsersRepository") private repository: IUsersRepositoryDomain
  ) {}

  async findAll(opts: any) {
    return this.repository.findAll(opts);
  }

  async create(body: any, opts?: any) {
    const bodyWithUUID = { ...body, id: generateUUID() };
    return this.repository.create(bodyWithUUID, opts);
  }

  async deleteById(id: string, opts?: any) {
    return this.repository.deleteById(id, opts);
  }

  async findById(id: string, opts?: any) {
    return this.repository.findById(id, opts);
    // const [res, err] = await this.repository.findById(id, opts);
    // return [res, err];
  }

  async updateById(id: string, body: any, opts?: any) {
    return this.repository.updateById(id, body, opts);
  }
}
