import ExploreFeaturesButton from "./ExploreFeaturesButton";

const Features = () => {
  return (
    <section
      id="features"
      className="pb-5 md:py-28 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            Everything you need to manage projects{" "}
            <span className="text-primary">effectively</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto">
            Streamline workflows, organize tasks, and collaborate with your team
            in real-time with our comprehensive project management solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl border border-neutral-200 bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-primary/10 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
              Kanban Boards
            </h3>
            <p className="text-neutral-700">
              Visualize your workflow with customizable boards. Drag and drop
              tasks between columns to update their status instantly and monitor
              progress.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl border border-neutral-200 bg-white hover:border-secondary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/15 transition-colors">
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
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-secondary transition-colors">
              Advanced Analytics
            </h3>
            <p className="text-neutral-700">
              Make data-driven decisions with comprehensive dashboards showing
              team performance, task completion rates, and resource allocation
              metrics.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl border border-neutral-200 bg-white hover:border-accent/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-accent/10 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-14 w-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-accent transition-colors">
              Team Collaboration
            </h3>
            <p className="text-neutral-700">
              Enhance teamwork with real-time comments, @mentions, shared files,
              and integrated communication tools to keep everyone aligned and
              informed.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group p-8 rounded-2xl border border-neutral-200 bg-white hover:border-info/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-info/5 to-info/10 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-14 w-14 bg-info/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-info/15 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-info"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-info transition-colors">
              Time Tracking
            </h3>
            <p className="text-neutral-700">
              Monitor hours spent on tasks with automatic timers, generate
              timesheet reports, and identify bottlenecks to optimize your
              team&apos;s productivity.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group p-8 rounded-2xl border border-neutral-200 bg-white hover:border-warning/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warning/5 to-warning/10 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-14 w-14 bg-warning/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-warning/15 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-warning"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-warning transition-colors">
              Smart Notifications
            </h3>
            <p className="text-neutral-700">
              Never miss important updates with priority-based notifications,
              customizable alerts for approaching deadlines, and team activity
              summaries.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group p-8 rounded-2xl border border-neutral-200 bg-white hover:border-success/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success/5 to-success/10 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-14 w-14 bg-success/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-success/15 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-success transition-colors">
              Documentation Hub
            </h3>
            <p className="text-neutral-700">
              Create, organize and share project documentation, attach files to
              tasks, and maintain a knowledge base for improved team
              coordination.
            </p>
          </div>
        </div>

        <ExploreFeaturesButton />
      </div>
    </section>
  );
};

export default Features;
