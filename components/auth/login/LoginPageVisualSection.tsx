const LoginPageVisualSection = () => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-neutral-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute h-40 w-40 bg-primary rounded-full -top-10 -left-10"></div>
        <div className="absolute h-60 w-60 bg-accent rounded-full -bottom-20 -right-20"></div>
        <div className="grid grid-cols-20 grid-rows-20 gap-8 opacity-10">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="h-2 w-2 bg-neutral-400 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 max-w-md">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-medium mb-4 text-sm">
            Project Management
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            Organize, <span className="text-primary">Track</span>, and{" "}
            <span className="text-accent">Collaborate</span>
          </h3>
          <p className="text-neutral-700">
            Keep your projects moving forward with intuitive boards, charts, and
            collaboration tools.
          </p>
        </div>

        {/* Simplified board visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-xs">
              My Dashboard
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                color: "bg-yellow-100 border-yellow-400",
                text: "Design Research",
              },
              {
                color: "bg-blue-100 border-blue-400",
                text: "User Interviews",
              },
              { color: "bg-green-100 border-green-400", text: "Prototyping" },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-md border-l-4 ${item.color}`}
              >
                <div className="h-4 bg-neutral-200 rounded-md w-3/4 mb-2"></div>
                <div className="h-3 bg-neutral-200 rounded-md w-1/2 mb-3"></div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    <div className="h-6 w-6 bg-primary rounded-full"></div>
                    <div className="h-6 w-6 bg-accent rounded-full"></div>
                  </div>
                  <div className="h-2 w-16 bg-neutral-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageVisualSection;
