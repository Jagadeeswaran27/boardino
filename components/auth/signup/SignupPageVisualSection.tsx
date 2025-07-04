const SignupPageVisualSection = () => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-section-bg-start to-section-bg-end relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute h-40 w-40 bg-accent rounded-full -top-10 -right-10"></div>
        <div className="absolute h-60 w-60 bg-primary rounded-full -bottom-20 -left-20"></div>
        <div className="grid grid-cols-20 grid-rows-20 gap-8 opacity-10">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="h-2 w-2 bg-neutral-400 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 max-w-md">
          <div className="inline-block px-3 py-1 bg-accent/10 rounded-full text-accent font-medium mb-4 text-sm">
            Task Management
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            Plan, <span className="text-secondary">Execute</span>, and{" "}
            <span className="text-primary">Succeed</span>
          </h3>
          <p className="text-neutral-700">
            Create beautiful Kanban boards, track progress, and deliver projects
            on time.
          </p>
        </div>

        {/* Gantt Chart Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>
            <div className="bg-secondary/10 px-3 py-1 rounded-full text-secondary text-xs">
              Project Timeline
            </div>
          </div>

          {/* Simplified Gantt Chart */}
          <div className="mb-4">
            <div className="flex justify-between mb-2 text-xs text-neutral-500">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
            <div className="h-1 w-full bg-neutral-100 rounded-full mb-4"></div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Research Phase</span>
                <span className="text-xs text-neutral-500">25%</span>
              </div>
              <div className="bg-neutral-100 h-6 w-full rounded-md relative">
                <div className="bg-primary h-full rounded-md absolute top-0 left-0 w-1/4"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Design Mockups</span>
                <span className="text-xs text-neutral-500">60%</span>
              </div>
              <div className="bg-neutral-100 h-6 w-full rounded-md relative">
                <div className="bg-secondary h-full rounded-md absolute top-0 left-0 w-3/5"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Development</span>
                <span className="text-xs text-neutral-500">10%</span>
              </div>
              <div className="bg-neutral-100 h-6 w-full rounded-md relative">
                <div className="bg-accent h-full rounded-md absolute top-0 left-0 w-1/10"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Testing</span>
                <span className="text-xs text-neutral-500">0%</span>
              </div>
              <div className="bg-neutral-100 h-6 w-full rounded-md relative"></div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full border-2 border-white"></div>
                <div className="h-8 w-8 bg-secondary rounded-full border-2 border-white"></div>
                <div className="h-8 w-8 bg-accent rounded-full border-2 border-white"></div>
              </div>
              <span className="ml-2 text-xs text-neutral-500">+2 more</span>
            </div>
            <div className="text-xs px-2 py-1 bg-subtle-accent rounded-full text-accent">
              On track
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPageVisualSection;
