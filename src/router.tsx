import { Route, Switch } from "wouter";
import App from "./App";
import { LoginView } from "./auth/views/LoginView";
import { Product } from "./product/components/Product.component";
import { ProtectedRoute } from "./commons/components/ProtectedRoute.component";
import { URL_ROUTES } from "./commons/const/url-routes";
import { ProductsView } from "./product/views/Products.view";

export const RoutesApp = () => {
  return (
    <App>
      <Switch>
        <Route path={URL_ROUTES.HOME} component={() => <h1>Home</h1>} />
        <Route path={URL_ROUTES.LOGIN} component={LoginView} />
        <Route
          path={URL_ROUTES.PRODUCTS}
          component={ProtectedRoute(<ProductsView />)}
        />
        <Route>404, Not Found!</Route>
      </Switch>
    </App>
  );
};
