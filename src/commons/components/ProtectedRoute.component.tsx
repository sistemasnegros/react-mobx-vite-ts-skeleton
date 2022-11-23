import { useSelector } from "react-redux";
import { Redirect } from "wouter";
import { URL_ROUTES } from "../const/url-routes";

export const ProtectedRoute = (children: any) => () => {
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.token || false;

  return isAuthenticated ? children : <Redirect to={URL_ROUTES.LOGIN} />;
};
