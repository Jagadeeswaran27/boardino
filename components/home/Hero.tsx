import { FaPlay, FaArrowRight, FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-neutral-50 py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute h-40 w-40 bg-primary rounded-full -top-10 -left-10"></div>
        <div className="absolute h-60 w-60 bg-accent rounded-full -bottom-20 -right-20"></div>
        <div className="grid grid-cols-20 grid-rows-20 gap-8 opacity-10">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="h-2 w-2 bg-neutral-400 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
              An Project Management Solution
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Visualize, <span className="text-primary">Track</span>, and{" "}
              <span className="text-accent">Deliver</span> Projects
            </h2>

            <p className="text-xl text-neutral-700 mb-8">
              Boardino helps teams organize tasks, track progress, and meet
              deadlines with powerful kanban boards, Gantt charts, and
              collaborative workspaces all in one visual platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="px-6 py-3 bg-primary text-white rounded-md text-lg hover:bg-primary-dark transition-colors flex items-center justify-center">
                Start for free <FaArrowRight className="ml-2" />
              </button>
              <button className="px-6 py-3 border border-neutral-200 rounded-md text-lg hover:bg-white transition-colors flex items-center justify-center">
                <FaPlay className="mr-2" /> Watch demo
              </button>
            </div>

            <div className="flex items-center text-sm text-neutral-600">
              <FaCheckCircle className="text-primary mr-2" /> No credit card
              required
              <span className="mx-3">•</span>
              <FaCheckCircle className="text-primary mr-2" /> Free 14-day trial
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative h-96 md:h-[450px] w-full rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white w-11/12 h-5/6 rounded-lg shadow-lg p-4">
                  <div className="h-full border border-neutral-100 rounded-md p-3">
                    {/* Browser controls */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="bg-neutral-100 rounded-md px-2 py-1 text-xs text-neutral-500">
                        boardino.app/projects
                      </div>
                      <div className="w-16"></div>
                    </div>

                    <div className="flex gap-4">
                      {/* Sidebar navigation */}
                      <div className="w-1/4">
                        <div className="bg-primary/10 p-2 rounded-md mb-2 border-l-4 border-primary">
                          <div className="h-4 bg-neutral-200 rounded-md w-3/4 mb-2"></div>
                          <div className="h-3 bg-neutral-200 rounded-md w-full"></div>
                        </div>
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-neutral-100 p-2 rounded-md mb-2"
                          >
                            <div className="h-4 bg-neutral-200 rounded-md w-1/2 mb-2"></div>
                            <div className="h-3 bg-neutral-200 rounded-md w-full"></div>
                          </div>
                        ))}
                      </div>

                      {/* Kanban board */}
                      <div className="w-3/4">
                        <div className="grid grid-cols-3 gap-2 h-full">
                          {["To Do", "In Progress", "Done"].map(
                            (column, colIndex) => (
                              <div
                                key={colIndex}
                                className="bg-neutral-50 p-2 rounded-md flex flex-col"
                              >
                                <div className="flex items-center mb-2 justify-between">
                                  <div className="font-medium text-xs">
                                    {column}
                                  </div>
                                  <div className="bg-neutral-200 h-5 w-5 rounded-full text-center text-xs">
                                    {colIndex === 0
                                      ? 4
                                      : colIndex === 1
                                      ? 3
                                      : 2}
                                  </div>
                                </div>
                                {[
                                  ...Array(
                                    colIndex === 0 ? 2 : colIndex === 1 ? 2 : 1
                                  ),
                                ].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`bg-white p-2 rounded-md mb-2 border-l-2 ${
                                      colIndex === 0
                                        ? "border-yellow-400"
                                        : colIndex === 1
                                        ? "border-blue-400"
                                        : "border-green-400"
                                    } shadow-sm`}
                                  >
                                    <div className="h-4 bg-neutral-200 rounded-md w-2/3 mb-2"></div>
                                    <div className="h-3 bg-neutral-200 rounded-md w-full mb-1"></div>
                                    <div className="h-3 bg-neutral-200 rounded-md w-4/5 mb-3"></div>
                                    <div className="flex justify-between items-center">
                                      <div className="flex">
                                        <div className="h-4 w-4 bg-primary rounded-full"></div>
                                        <div className="h-4 w-4 bg-accent rounded-full -ml-1"></div>
                                      </div>
                                      <div className="h-2 w-1/3 bg-neutral-200 rounded-full"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
