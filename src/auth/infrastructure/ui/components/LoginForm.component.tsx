import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useLocation } from "wouter";

import { observer } from "mobx-react-lite";

import { URL_ROUTES } from "@/commons/const/url-routes";
import { useContextGlobal } from "../../../../commons/infrastructure/ui/hooks/context-global.hook";
import { LoginFormViewModel } from "../view-models/loginForm.view-model";
import { FormattedMessage } from "react-intl";

interface LoginFormInterface {}

export const LoginForm: React.FC<LoginFormInterface> = observer(() => {
  const { globalStore } = useContextGlobal();
  const model =
    globalStore.container.get<LoginFormViewModel>("LoginFormViewModel");

  const [, setLocation] = useLocation();

  useEffect(() => {
    if (globalStore.isAuthenticated()) {
      setLocation(URL_ROUTES.HOME);
    }
  }, []);

  const onFinish = async (values: any) => {
    const [, err]: any = await model.login(values);

    if (err) {
      return;
    }
    setLocation(URL_ROUTES.HOME);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        email: "perrogordo1@yopmail.com",
        password: "perrogordo",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={model.loading}>
          <FormattedMessage id="LOGIN" />
        </Button>
      </Form.Item>
    </Form>
  );
});
