import { Layout } from "antd";
import { Navbar } from "../../../../commons/infrastructure/ui/components/Navbar.component";
import { LoginForm } from "../components/LoginForm.component";

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
          <h1>Login</h1>
          <LoginForm />
        </div>
      </Content>
    </Layout>
  );
};
