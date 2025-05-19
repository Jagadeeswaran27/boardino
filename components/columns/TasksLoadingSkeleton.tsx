const TasksLoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-5 h-5 bg-gray-200 rounded-md mr-2"></div>
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm"
        >
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TasksLoadingSkeleton;
