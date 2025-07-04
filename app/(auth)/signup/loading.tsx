const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="animate-pulse">
            <div className="h-10 w-40 bg-gray-200 rounded mb-12"></div>
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="h-12 w-full bg-gray-200 rounded mb-6"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-8"></div>
            <div className="h-12 w-full bg-gray-200 rounded mb-6"></div>
            <div className="h-12 w-full bg-gray-200 rounded mb-6"></div>
            <div className="h-12 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-neutral-50"></div>
    </div>
  );
};

export default Loading;
