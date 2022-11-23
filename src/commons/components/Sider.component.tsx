import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { URL_ROUTES } from "../const/url-routes";
import { Link, useLocation } from "wouter";
import { useSelector } from "react-redux";

const itemsPublic = [
  { label: <Link href={URL_ROUTES.HOME}>Home</Link>, icon: <HomeOutlined /> },
].map((e, i) => ({
  ...e,
  key: `SidebarPublic${i}`,
}));

const itemsPrivate = [
  {
    label: <Link href={URL_ROUTES.PRODUCTS}>Products</Link>,
    icon: <LaptopOutlined />,
  },
].map((e, i) => ({
  ...e,
  key: `SidebarPrivate${i}`,
}));

export const Sidebar = () => {
  const auth = useSelector((state: any) => state.auth);

  const itemsEnables = auth?.user?.fullName
    ? itemsPublic.concat(itemsPrivate)
    : itemsPublic;

  console.log("auth", auth);
  console.log("Items =>", itemsEnables);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ minHeight: "100vh", borderRight: 0 }}
      items={itemsEnables}
    />
  );
};
