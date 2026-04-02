const AuthDivider = () => {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-neutral-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-4 text-sm text-neutral-500">
          or continue with
        </span>
      </div>
    </div>
  );
};

export default AuthDivider;
