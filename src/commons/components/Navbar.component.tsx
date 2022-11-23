import { Avatar, Menu } from "antd";
import {
  LoginOutlined,
  HomeFilled,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { URL_ROUTES } from "../const/url-routes";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../auth/redux/reducers/auth-slice.reducer";
import { AuthServiceIns } from "@/auth/services/auth.services";

const { SubMenu } = Menu;

export const Navbar = () => {
  const [state, setState] = useState({ current: "home" });

  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    setState({ current: e.key });
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    AuthServiceIns.logout();
  };

  const ItemsAuth = [
    {
      label: (
        <div>
          <Avatar icon={<UserOutlined />} />
          <span className="avatar__name" style={{ marginLeft: "10px" }}>
            {auth.user.fullName}
          </span>
        </div>
      ),
      children: [{ onClick: handleLogout, label: "LogOut" }],
    },
  ];

  const Items = [
    {
      label: <Link href={URL_ROUTES.LOGIN}>Login </Link>,
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[state.current]}
      theme="dark"
      mode="horizontal"
      style={{ display: "flex", justifyContent: "flex-end" }}
      items={auth?.user?.fullName ? ItemsAuth : Items}
    />
  );
};
