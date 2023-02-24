import { createContext } from "react";
import { GlobalStore } from "../store/global.store";

interface IStoreContext {
  globalStore: GlobalStore;
}

export const globalStore = new GlobalStore();

export const initialContext: IStoreContext = { globalStore };

export const StoreContext = createContext<IStoreContext>(initialContext);
