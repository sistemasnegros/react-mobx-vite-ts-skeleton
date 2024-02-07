import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { globalStore } from "../../../../commons/infrastructure/ui/context/store.context";
import { IUsersDomain } from "../../../domain/users.domain";
import { IUsersRepositoryDomain } from "../../../domain/users.repository.domain";
import { generateUUID } from "../../../../commons/lib/utils";

@injectable()
export class UsersViewModel {
  loading = false;
  data: IUsersDomain[] = [];

  openForm = false;
  modeEditForm: null | string = null;
  initialValues: any = {};

  setDefaultDataForm() {
    this.modeEditForm = null;
    this.initialValues = {};
  }

  constructor(@inject("UsersRepository") private repository: IUsersRepositoryDomain) {
    makeAutoObservable(this);
  }

  toggleForm() {
    this.openForm = this.openForm ? false : true;
    if (this.openForm) {
      this.setDefaultDataForm();
    }
  }

  async loadInitialValues() {
    if (!this.modeEditForm) {
      return;
    }

    this.loading = true;
    const [res, err] = await this.repository.findById(this.modeEditForm, {
      token: globalStore.token,
    });

    this.loading = false;

    if (!res) {
      globalStore.setErr(err.code);
      return [res, err];
    }

    this.initialValues = res.data;

    return [res, err];
  }

  async findAll() {
    this.loading = true;

    const [res, err] = await this.repository.findAll({ token: globalStore.token });
    this.loading = false;

    console.log("RES MODEL VIEW", res);
    if (!res) {
      globalStore.setErr(err.code);
      return [res, err];
    }

    this.data = res.data;
    return [res, err];
  }

  async create(body: any) {
    this.loading = true;
    const [res, err] = await this.repository.create(
      { ...body, _id: generateUUID() },
      {
        token: globalStore.token,
      }
    );

    this.loading = false;

    if (!res) {
      globalStore.setErr(err.code);
      return [res, err];
    }
    this.toggleForm();
    this.setDefaultDataForm();
    globalStore.setSuccessMsg("SUCCESS_CREATED");
    await this.findAll();

    return [res, err];
  }

  async updateById(id: string, body: any) {
    this.loading = true;
    const [res, err] = await this.repository.updateById(id, body, {
      token: globalStore.token,
    });
    this.loading = false;

    if (!res) {
      globalStore.setErr(err.code);
      return [res, err];
    }
    this.toggleForm();
    globalStore.setSuccessMsg("SUCCESS_UPDATED");
    await this.findAll();

    return [res, err];
  }

  async deleteById(id: string) {
    const [res, err] = await this.repository.deleteById(id, {
      token: globalStore.token,
    });
    if (!res) {
      globalStore.setErr(err.code);
      return [res, err];
    }
    globalStore.setSuccessMsg("SUCCESS_DELETED");
    await this.findAll();
  }
}
