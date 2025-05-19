export default function BoardsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="h-8 w-40 bg-neutral-200 rounded-md animate-pulse"></div>
          <div className="h-5 w-64 bg-neutral-200 rounded-md animate-pulse mt-2"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="h-10 w-full sm:w-64 bg-neutral-200 rounded-md animate-pulse"></div>
          <div className="h-10 w-full sm:w-36 bg-neutral-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Boards Section Skeleton */}
      <div>
        <div className="h-7 w-24 bg-neutral-200 rounded-md animate-pulse mb-4"></div>

        {/* Board Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border border-neutral-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-6 w-3/4 bg-neutral-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-full bg-neutral-200 rounded-md animate-pulse mt-2"></div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="h-8 w-24 bg-neutral-200 rounded-md animate-pulse"></div>
                  <div className="flex gap-1">
                    {Array(3)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className="h-8 w-8 rounded-full bg-neutral-200 animate-pulse"
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
