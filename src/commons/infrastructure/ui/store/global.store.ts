import { makeAutoObservable } from "mobx";
import { LocalStoreRepositoryIst } from "../../repository/local-store.repository";
import { container } from "../../../../bootstrap";

export class GlobalStore {
  authenticated = false;
  user: any = null;
  token: null | string = null;
  loading = false;
  container = container;
  theme = "dark";

  private readonly keyToken = "reactJwtToken";

  constructor() {
    makeAutoObservable(this);

    const user = this.getTokenLocalStore();

    if (user) {
      this.setAuthenticate({ user });
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
  }

  setTokenLocalStore() {
    LocalStoreRepositoryIst.save({ key: this.keyToken, value: this.user });
  }

  getTokenLocalStore() {
    return LocalStoreRepositoryIst.load({ key: this.keyToken });
  }

  setAuthenticate(arg: { user: any; token?: string }) {
    const { user, token } = arg;
    this.authenticated = true;
    this.token = token || null;
    this.user = user;
    this.setTokenLocalStore();
  }

  logout() {
    LocalStoreRepositoryIst.delete({ key: this.keyToken });
    this.authenticated = false;
    this.user = null;
    this.token = null;
  }
}
