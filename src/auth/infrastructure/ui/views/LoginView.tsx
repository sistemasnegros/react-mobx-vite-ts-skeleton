import { Layout, Typography } from "antd";
import { Navbar } from "../../../../commons/infrastructure/ui/components/Navbar.component";
import { LoginForm } from "../components/LoginForm.component";

const { Title } = Typography;

const { Header, Content } = Layout;

interface LoginViewInterface {}

export const LoginView: React.FC<LoginViewInterface> = () => {
  return (
    <Layout>
      <Header className="header">
        <Navbar />
      </Header>
      <Content
        style={{ minHeight: "calc(100vh - 64px) " }}
        className=" d-flex justify-content-center align-items-center"
      >
        <div
          style={{
            width: "440px",
            maxWidth: "calc(100vw - 64px)",
            textAlign: "center",
          }}
        >
          <Title level={2}>Login</Title>
          <LoginForm />
        </div>
      </Content>
    </Layout>
  );
};
