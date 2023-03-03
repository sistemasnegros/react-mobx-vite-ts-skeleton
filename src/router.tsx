import { Route, Switch } from "wouter";
import App from "./App";
import { LoginView } from "./auth/infrastructure/ui/views/LoginView";
import { ProtectedRoute } from "./commons/infrastructure/ui/components/ProtectedRoute.component";
import { URL_ROUTES } from "./commons/const/url-routes";
import { UsersView } from "./users/infrastructure/ui/views/Users.view";

export const RoutesApp = () => {
  return (
    <Switch>
      <Route path={URL_ROUTES.LOGIN} component={LoginView} />
      <App>
        <Switch>
          <Route path={URL_ROUTES.HOME} component={() => <h1>Home</h1>} />
          <Route
            path={URL_ROUTES.USERS}
            component={ProtectedRoute(<UsersView />)}
          />
          <Route>404, Not Found!</Route>
        </Switch>
      </App>
    </Switch>
  );
};
