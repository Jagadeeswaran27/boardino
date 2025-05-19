export default function BoardDetailsLoading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Board Header Skeleton */}
      <div className="bg-white border-b border-neutral-200 sticky top-[-5px] z-20">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-neutral-200 rounded-full animate-pulse"></div>

            <div className="flex-1">
              <div className="h-8 w-64 bg-neutral-200 rounded-md animate-pulse mb-2"></div>
              <div className="h-5 w-96 bg-neutral-200 rounded-md animate-pulse"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-24 bg-neutral-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Board Tabs Skeleton */}
          <div className="flex border-b border-neutral-200 gap-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-28 bg-neutral-200 rounded-md animate-pulse mb-2"
                ></div>
              ))}
          </div>
        </div>
      </div>

      {/* Board Content Skeleton */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex lg:flex-row flex-col gap-6">
          {/* Main Content Area Skeleton */}
          <div className="lg:w-3/4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-neutral-200 p-4 h-[300px]"
                  >
                    <div className="h-6 w-32 bg-neutral-200 rounded-md animate-pulse mb-4"></div>

                    {/* Task items skeletons */}
                    {Array(3)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className="h-16 bg-neutral-200 rounded-md animate-pulse mb-3"
                        ></div>
                      ))}
                  </div>
                ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              {/* Board Stats Skeleton */}
              <div className="p-4 border-b border-neutral-200">
                <div className="h-6 w-24 bg-neutral-200 rounded-md animate-pulse mb-4"></div>

                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-neutral-200 rounded-md animate-pulse mr-2"></div>
                  <div className="h-4 w-32 bg-neutral-200 rounded-md animate-pulse"></div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="w-5 h-5 bg-neutral-200 rounded-md animate-pulse mr-2"></div>
                  <div className="h-4 w-24 bg-neutral-200 rounded-md animate-pulse"></div>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <div className="h-4 w-16 bg-neutral-200 rounded-md animate-pulse mb-2"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-neutral-200 rounded-full animate-pulse"></div>
                    <div className="h-5 w-32 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Members List Skeleton */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="h-6 w-24 bg-neutral-200 rounded-md animate-pulse"></div>
                  <div className="h-5 w-16 bg-neutral-200 rounded-md animate-pulse"></div>
                </div>

                <div className="space-y-3">
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-200 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 w-32 bg-neutral-200 rounded-md animate-pulse mb-1"></div>
                          <div className="h-3 w-40 bg-neutral-200 rounded-md animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
