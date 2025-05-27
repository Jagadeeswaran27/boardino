const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white p-1 rounded-lg shadow-md animate-pulse">
      <div className="align-middle inline-block min-w-full">
        <div className="shadow overflow-hidden border-b border-neutral-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                {[...Array(5)].map((_, i) => (
                  <th key={i} scope="col" className="px-6 py-3 text-left">
                    <div className="h-4 bg-neutral-200 rounded w-20"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-5 bg-neutral-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-neutral-100 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-5 bg-neutral-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-neutral-200 rounded-full"></div>
                      <div className="ml-3 h-4 bg-neutral-200 rounded w-20"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-neutral-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-neutral-200 rounded w-24"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
