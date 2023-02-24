import { injectable } from "inversify";
import { sleep } from "../../../commons/lib/utils";
import { EUsersRolesDomain } from "../../../users/domain/users.domain";
import {
  IAuthRepositoryDomain,
  ILoginRepositoryDomain,
  ILoginRequestDomain,
} from "../../domain/repository/auth.repository.domain";

@injectable()
export class AuthFakeRepository implements IAuthRepositoryDomain {
  async login(body: ILoginRequestDomain) {
    return new Promise<ILoginRepositoryDomain>(async (resolve) => {
      await sleep(2000);
      const data = {
        token: "tokenFake",
        user: {
          id: "",
          email: body.email,
          firstName: "Alejandro",
          lastName: "Franco",
          fullName: "Alejandro Franco",
          role: EUsersRolesDomain.STANDARD,
        },
      };
      return resolve([data, null]);
    });
  }
}

// export const AuthFakeRepositoryIns = new AuthFakeRepository();
