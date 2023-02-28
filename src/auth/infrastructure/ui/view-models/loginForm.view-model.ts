import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { globalStore } from "../../../../commons/infrastructure/ui/context/store.context";
import { IAuthService } from "../../../domain/auth.service.domain";

@injectable()
export class LoginFormViewModel {
  loading = false;

  constructor(@inject("AuthService") readonly authService: IAuthService) {
    makeAutoObservable(this);
  }

  async login(values: any) {
    this.loading = true;

    const [res, err] = await this.authService.login(values);

    if (!err && res) {
      globalStore.setAuthenticate({ user: res.user, token: res.token });
    }

    this.loading = false;
    return [res, err];
  }
}
