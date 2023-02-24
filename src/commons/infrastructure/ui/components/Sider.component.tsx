import { LaptopOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { URL_ROUTES } from "../../../const/url-routes";
import { Link } from "wouter";
import { observer } from "mobx-react-lite";
import { useContextGlobal } from "../hooks/context-global.hook";

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

export const Sidebar = observer(() => {
  const { globalStore } = useContextGlobal();

  const itemsEnables = globalStore.authenticated
    ? itemsPublic.concat(itemsPrivate)
    : itemsPublic;

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ minHeight: "100vh", borderRight: 0 }}
      items={itemsEnables}
    />
  );
});
