import { ConfigProvider, theme } from "antd";
import { observer } from "mobx-react-lite";
import { useIntl } from "react-intl";
import { useContextGlobal } from "../hooks/context-global.hook";

import en_US from "antd/locale/en_US";
import es_ES from "antd/locale/es_ES";
import { openNotificationWithIcon } from "../components/Notification.component";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { URL_ROUTES } from "../../../const/url-routes";

const supportedLocales = {
  en: en_US,
  es: es_ES,
};

export const AntdProvider: React.FC = observer(({ children }) => {
  const { globalStore } = useContextGlobal();
  const lang = globalStore.lang;
  const { formatMessage } = useIntl();
  const [, setLocation] = useLocation();

  const validateMessages = {
    required: formatMessage(
      { id: "FORM_FIELD_REQUIRED" },
      { fieldName: "${label}" }
    ),
    types: {
      email: formatMessage(
        { id: "FORM_FIELD_EMAIL_INVALID" },
        { fieldName: "${label}" }
      ),
    },
  };

  // Force Redirect Login
  useEffect(() => {
    if (!globalStore.user) {
      setLocation(URL_ROUTES.LOGIN);
    }
  }, [globalStore.user]);

  // Show Messages Error
  useEffect(() => {
    if (!globalStore.err) {
      return;
    }
    openNotificationWithIcon({
      type: "error",
      title: "Error",
      description: globalStore.err?.message ?? "",
    });
    globalStore.setResetErr();
  }, [globalStore.err]);

  // Show Messages Success
  useEffect(() => {
    if (!globalStore.successMsg) {
      return;
    }
    openNotificationWithIcon({
      type: "success",
      title: "Success",
      description: globalStore?.successMsg ?? "",
    });
    globalStore.setResetSuccessMsg();
  }, [globalStore.successMsg]);

  return (
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
      locale={supportedLocales[lang]}
      form={{ validateMessages, requiredMark: "optional" }}
    >
      {children}
    </ConfigProvider>
  );
});
