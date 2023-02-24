import { useContext } from "react";
import { StoreContext } from "../context/store.context";

export const useContextGlobal = () => {
  return useContext(StoreContext);
};
