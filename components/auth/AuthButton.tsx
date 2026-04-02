import { FaArrowRight } from "react-icons/fa";

interface AuthButtonProps {
  text: string;
  loadingText: string;
  isLoading?: boolean;
}
const AuthButton = (props: AuthButtonProps) => {
  const { text, isLoading, loadingText } = props;
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`cursor-pointer w-full px-6 py-3 bg-primary text-white rounded-md text-lg hover:bg-primary-dark transition-colors flex items-center justify-center ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? (
        <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : null}
      {isLoading ? loadingText : text}
      {!isLoading && <FaArrowRight className="ml-2" />}
    </button>
  );
};

export default AuthButton;
