import LoginFormUI from "@/components/auth/login/LoginFormUI";
import LoginPageVisualSection from "@/components/auth/login/LoginPageVisualSection";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginFormUI />
      <LoginPageVisualSection />
    </div>
  );
};

export default LoginPage;
