import { injectable } from "inversify";
import { sleep } from "../../../commons/lib/utils";
import { EUsersRolesDomain } from "../../../users/domain/users.domain";
import {
  IAuthRepositoryDomain,
  ILoginRequestDomain,
  ILoginReturnRepositoryDomain,
} from "../../domain/auth.repository.domain";

@injectable()
export class AuthFakeRepository implements IAuthRepositoryDomain {
  async login(body: ILoginRequestDomain) {
    return new Promise<ILoginReturnRepositoryDomain>(async (resolve) => {
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
