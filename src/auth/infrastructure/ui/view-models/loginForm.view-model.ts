import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { globalStore } from "../../../../commons/infrastructure/ui/context/store.context";
import { IAuthRepositoryDomain } from "../../../domain/auth.repository.domain";

@injectable()
export class LoginFormViewModel {
  loading = false;

  constructor(@inject("AuthRepository") private repository: IAuthRepositoryDomain) {
    makeAutoObservable(this);
  }

  async login(values: any) {
    this.loading = true;

    const [res, err] = await this.repository.login(values);

    if (err) {
      globalStore.setErr(err.code);
    }

    if (!err && res) {
      globalStore.setSuccessMsg("SUCCESS_LOGIN");

      globalStore.setAuthenticate({
        user: res.data.user,
        token: res.data.token,
      });
    }

    this.loading = false;
    return [res, err];
  }
}
