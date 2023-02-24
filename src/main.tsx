import React from "react";
import ReactDOM from "react-dom";
import { RoutesApp } from "./router";
import {
  globalStore,
  initialContext,
  StoreContext,
} from "./commons/infrastructure/ui/context/store.context";

import "bootstrap-4-grid/css/grid.min.css";
import "./index.css";

import { ConfigProvider, theme } from "antd";
import { observer } from "mobx-react-lite";

const RootApp = observer(() => {
  // const { globalStore } = useContextGlobal();
  console.log("THEME ROOT:", globalStore.theme);
  return (
    <StoreContext.Provider value={initialContext}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
          algorithm:
            globalStore.theme === "light"
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm,
        }}
      >
        <RoutesApp />
      </ConfigProvider>
    </StoreContext.Provider>
  );
});

ReactDOM.render(<RootApp />, document.getElementById("root"));
