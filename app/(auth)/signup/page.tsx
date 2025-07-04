import SignupFormUI from "@/components/auth/signup/SignupFormUI";
import SignupPageVisualSection from "@/components/auth/signup/SignupPageVisualSection";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <SignupFormUI />
      <SignupPageVisualSection />
    </div>
  );
};

export default SignupPage;
