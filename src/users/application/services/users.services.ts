import { inject, injectable } from "inversify";
import { generateUUID } from "../../../commons/lib/utils";
import { UsersRepository } from "../../infrastructure/repository/users.api.repository";

@injectable()
export class UsersService {
  constructor(@inject("UsersRepository") private repository: UsersRepository) {}

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
  }

  async updateById(id: string, body: any, opts?: any) {
    return this.repository.updateById(id, body, opts);
  }
}
