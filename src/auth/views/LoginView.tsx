import { LoginForm } from "../components/LoginForm.component";

interface LoginViewInterface {}

export const LoginView: React.FC<LoginViewInterface> = () => {
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
    </>
  );
};
