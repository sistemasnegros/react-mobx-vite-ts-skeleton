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

import { observer } from "mobx-react-lite";
import { IntlProvider } from "react-intl";

import { EnLang } from "./commons/infrastructure/ui/intl/lang/en";
import { EsLang } from "./commons/infrastructure/ui/intl/lang/es";
import { AntdProvider } from "./commons/infrastructure/ui/antd/Antd.provider";

const supportedMessages = {
  en: EnLang,
  es: EsLang,
};

const RootApp = observer(() => {
  const lang = globalStore.lang;

  return (
    <StoreContext.Provider value={initialContext}>
      <IntlProvider
        messages={supportedMessages[lang] as Record<string, any>}
        locale={lang}
      >
        <AntdProvider>
          <RoutesApp />
        </AntdProvider>
      </IntlProvider>
    </StoreContext.Provider>
  );
});

ReactDOM.render(<RootApp />, document.getElementById("root"));
