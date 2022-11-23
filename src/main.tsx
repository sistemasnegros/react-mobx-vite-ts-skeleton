import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import storeRedux from "./commons/redux/store.redux";
import { authActions } from "./auth/redux/reducers/auth-slice.reducer";

import { AuthServiceIns } from "./auth/services/auth.services";
import { RoutesApp } from "./router";
import "./index.css";

const RootApp = () => {
  const { auth } = storeRedux.getState();
  const dispatch = storeRedux.dispatch;

  const user = AuthServiceIns.getTokenLocalStore();
  if (user && !auth.token) {
    storeRedux.dispatch(authActions.login(user));
  }

  return (
    <Provider store={storeRedux}>
      <RoutesApp />
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
  document.getElementById("root")
);
