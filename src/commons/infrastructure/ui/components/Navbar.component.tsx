import { Avatar, Button, Menu, Switch } from "antd";
import {
  LoginOutlined,
  HomeFilled,
  UserOutlined,
  LogoutOutlined,
  FireOutlined,
  FireFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { URL_ROUTES } from "../../../const/url-routes";
import { useContextGlobal } from "../hooks/context-global.hook";
import { observer } from "mobx-react-lite";
import { Sun, Moon } from "react-bootstrap-icons";
const { SubMenu } = Menu;

export const Navbar = observer(() => {
  const { globalStore } = useContextGlobal();
  const [location, setLocation] = useLocation();

  const [state, setState] = useState({ current: "home" });

  const handleClick = (e: any) => {
    setState({ current: e.key });
  };

  const handleLogout = () => {
    globalStore.logout();
    setLocation(URL_ROUTES.LOGIN);
  };

  const ItemsShared = [
    {
      label: (
        <Button
          type="primary"
          shape="circle"
          icon={globalStore.theme === "light" ? <Sun /> : <Moon />}
          onClick={() => globalStore.toggleTheme()}
        />
      ),
    },
  ];

  const ItemsAuth: any = [
    {
      label: (
        <div>
          <Avatar icon={<UserOutlined />} />
          <span className="avatar__name" style={{ marginLeft: "10px" }}>
            {globalStore.getFullName()}
          </span>
        </div>
      ),
      children: [{ onClick: handleLogout, label: "LogOut" }],
    },
  ];

  const Items: any = [
    {
      label: <Link href={URL_ROUTES.LOGIN}>Login </Link>,
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ display: "flex", justifyContent: "flex-end" }}
      items={
        globalStore.isAuthenticated()
          ? ItemsShared.concat(ItemsAuth).map((e, i) => ({
              ...e,
              key: `navbar-${i}`,
            }))
          : ItemsShared.concat(Items).map((e, i) => ({
              ...e,
              key: `navbar-${i}`,
            }))
      }
      selectable={false}
    />
  );
});
