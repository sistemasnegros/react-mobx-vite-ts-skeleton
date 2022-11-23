import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "wouter";

import { openNotificationWithIcon } from "@/commons/components/Notification.component";
import { URL_ROUTES } from "@/commons/const/url-routes";
import { loadingActions } from "@/commons/redux/reducers/loading-slice.reducer";
import { AuthServiceIns } from "../services/auth.services";
import { authActions } from "../redux/reducers/auth-slice.reducer";

interface LoginFormInterface {}

export const LoginForm: React.FC<LoginFormInterface> = () => {
  const auth = useSelector((state: any) => state.auth);
  const [location, setLocation] = useLocation();
  const dispatch = useDispatch();

  if (auth.email) {
    setLocation(URL_ROUTES.HOME);
  }

  const onFinish = async (values: any) => {
    dispatch(loadingActions.start());
    const [auth, err] = await AuthServiceIns.login(values);
    dispatch(loadingActions.stop());

    if (err) {
      openNotificationWithIcon({
        type: "error",
        title: "Error",
        description: err.message,
      });
      return;
    }

    dispatch(authActions.login(auth));
    AuthServiceIns.SetTokenLocalStore(auth);
    setLocation(URL_ROUTES.PRODUCTS);

    console.log("Success:", auth);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ email: "perrogordo@yopmail.com", password: "123456" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
