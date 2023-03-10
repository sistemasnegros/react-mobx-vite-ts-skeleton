import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Navbar } from "./commons/infrastructure/ui/components/Navbar.component";
import { Sidebar } from "./commons/infrastructure/ui/components/Sider.component";

import "./App.css";

const { Header, Content, Sider } = Layout;

const App: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </div>
        <Navbar />
      </Header>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={200}
          className="site-layout-background"
          trigger={null}
          collapsible
          onBreakpoint={(broken) => {
            // console.log(broken);
            setCollapsed(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
          collapsed={collapsed}
        >
          <Sidebar />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
