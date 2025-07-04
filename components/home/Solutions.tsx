const Solutions = () => {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-2/5">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Solutions for every team
            </h2>
            <p className="text-lg text-neutral-700 mb-8">
              No matter what type of team you&apos;re in, Boardino can be
              customized to fit your specific needs and workflows.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-lg font-medium">
                  Software Development
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-lg font-medium">
                  Marketing & Creative
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-lg font-medium">Business Operations</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-lg font-medium">Product Management</span>
              </div>
            </div>
          </div>

          <div className="md:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-14 w-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Agile & Scrum</h3>
                <p className="text-neutral-700">
                  Plan, track, and ship your agile projects with customizable
                  scrum boards and sprint planning tools.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Project Management
                </h3>
                <p className="text-neutral-700">
                  Organize tasks, set priorities, and track progress to deliver
                  successful projects on time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-14 w-14 bg-accent/10 rounded-lg flex items-center justify-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Task Management</h3>
                <p className="text-neutral-700">
                  Break down complex projects into manageable tasks and subtasks
                  for better execution.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-14 w-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Team Management</h3>
                <p className="text-neutral-700">
                  Assign tasks, manage workloads, and collaborate effectively
                  with your entire team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
