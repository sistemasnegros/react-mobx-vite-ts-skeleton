import { useSelector } from "react-redux";
import { Redirect } from "wouter";
import { URL_ROUTES } from "../../../const/url-routes";
import { useContextGlobal } from "../hooks/context-global.hook";

export const ProtectedRoute = (children: any) => () => {
  const { globalStore } = useContextGlobal();

  return globalStore.authenticated ? (
    children
  ) : (
    <Redirect to={URL_ROUTES.LOGIN} />
  );
};
