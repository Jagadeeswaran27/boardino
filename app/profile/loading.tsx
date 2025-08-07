import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-neutral-200 animate-pulse rounded ${className}`}></div>
);

const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back to home and Sign out buttons skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <SkeletonBox className="h-9 w-32" />
        <SkeletonBox className="h-9 w-24" />
      </div>

      {/* User Info Section Skeleton */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <SkeletonBox className="w-20 h-20 rounded-full" />
              <div className="flex-1">
                <SkeletonBox className="h-8 w-64 mb-2" />
                <SkeletonBox className="h-5 w-48 mb-4" />
                <div className="flex gap-4">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-4 w-2" />
                  <SkeletonBox className="h-4 w-28" />
                  <SkeletonBox className="h-4 w-2" />
                  <SkeletonBox className="h-4 w-36" />
                </div>
              </div>
              <SkeletonBox className="h-9 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow"
          >
            <div className="p-6 text-center">
              <SkeletonBox className="h-8 w-8 mx-auto mb-2" />
              <SkeletonBox className="h-4 w-24 mx-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* Boards Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Created Boards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <SkeletonBox className="h-8 w-32" />
            <SkeletonBox className="h-9 w-28" />
          </div>
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow"
              >
                <div className="p-6">
                  <SkeletonBox className="h-6 w-48 mb-2" />
                  <SkeletonBox className="h-4 w-full mb-4" />
                  <div className="flex items-center gap-4">
                    <SkeletonBox className="h-4 w-20" />
                    <SkeletonBox className="h-4 w-16" />
                    <SkeletonBox className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributing Boards */}
        <div>
          <SkeletonBox className="h-8 w-36 mb-6" />
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <SkeletonBox className="h-6 w-40" />
                    <SkeletonBox className="h-6 w-16 rounded-full" />
                  </div>
                  <SkeletonBox className="h-4 w-full mb-4" />
                  <div className="flex items-center gap-4">
                    <SkeletonBox className="h-4 w-28" />
                    <SkeletonBox className="h-4 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assigned Tasks Skeleton */}
      <div className="mt-8">
        <SkeletonBox className="h-8 w-24 mb-6" />
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="text-left p-4">
                    <SkeletonBox className="h-5 w-12" />
                  </th>
                  <th className="text-left p-4">
                    <SkeletonBox className="h-5 w-12" />
                  </th>
                  <th className="text-left p-4">
                    <SkeletonBox className="h-5 w-16" />
                  </th>
                  <th className="text-left p-4">
                    <SkeletonBox className="h-5 w-12" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="border-b hover:bg-neutral-50">
                    <td className="p-4">
                      <SkeletonBox className="h-5 w-32" />
                    </td>
                    <td className="p-4">
                      <SkeletonBox className="h-5 w-24" />
                    </td>
                    <td className="p-4">
                      <SkeletonBox className="h-5 w-20" />
                    </td>
                    <td className="p-4">
                      <SkeletonBox className="h-6 w-16 rounded-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
