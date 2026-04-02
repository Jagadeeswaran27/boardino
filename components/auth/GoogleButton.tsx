import Image from "next/image";

interface GoogleButtonProps {
  handleOAuth: (provider: "google" | "github") => void;
}

const GoogleButton = (props: GoogleButtonProps) => {
  const { handleOAuth } = props;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <button
        onClick={() => handleOAuth("google")}
        type="button"
        className="cursor-pointer flex-1 px-4 py-3 border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors flex items-center justify-center"
      >
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          width={18}
          height={18}
          alt="Google logo"
          className="mr-2"
        />
        <span>Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;
