import { makeAutoObservable } from "mobx";
import { LocalStoreRepositoryIst } from "../../repository/local-store.repository";
import { container } from "../../../../bootstrap";

export class GlobalStore {
  user: any = null;
  token: null | string = null;
  loading = false;
  theme = "dark";
  lang: "en" | "es" = "en";
  container = container;
  err: any = null;
  successMsg: any = null;

  getFullName() {
    return this.isAuthenticated()
      ? `${this.user.firstName} ${this.user.lastName}`
      : "";
  }

  setErr(err: any) {
    this.err = err;
  }

  setResetErr() {
    this.err = null;
  }

  setSuccessMsg(msg: string) {
    this.successMsg = msg;
  }

  setResetSuccessMsg() {
    this.successMsg = null;
  }

  private readonly keyUser = "skeletonReactUserData";
  private readonly keyToken = "skeletonReactJwtToken";

  constructor() {
    makeAutoObservable(this);

    this.getLoadLocalStore();
  }

  isAuthenticated() {
    return this.user && this.token;
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
  }

  setDataLocalStore() {
    LocalStoreRepositoryIst.save({
      key: this.keyToken,
      value: this.token,
    });
    LocalStoreRepositoryIst.save({
      key: this.keyUser,
      value: this.user,
    });
  }

  getLoadLocalStore() {
    this.user = LocalStoreRepositoryIst.load({ key: this.keyUser });
    this.token = LocalStoreRepositoryIst.load({ key: this.keyToken });
  }

  setAuthenticate(arg: { user: any; token?: string }) {
    const { user, token } = arg;
    this.token = token || null;
    this.user = user;
    this.setDataLocalStore();
  }

  logout() {
    LocalStoreRepositoryIst.delete({ key: this.keyUser });
    LocalStoreRepositoryIst.delete({ key: this.keyToken });
    this.user = null;
    this.token = null;
  }
}
