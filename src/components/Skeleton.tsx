import { Skeleton } from "./ui/skeleton";

export const SkeletonUserProfile = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-3 w-32 rounded-md" />
      </div>
    </div>
  );
};

export const SummaryCardSkeleton = () => {
  return (
    <div className="flex items-center justify-start border rounded-[10px] shadow-sm p-5 gap-4 h-[105px] w-full min-w-[160px] animate-pulse">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-6 w-32 rounded-md" />
      </div>
    </div>
  );
};

export const SummaryCardSkeletonGroup = ({ count = 3 }: { count?: number }) => (
  <div className="flex gap-4 w-full">
    {Array.from({ length: count }).map((_, i) => (
      <SummaryCardSkeleton key={i} />
    ))}
  </div>
);

export const WorkingCapitalChartSkeleton = () => {
  return (
    <div className="w-full h-[320px] border rounded-xl p-4 flex flex-col justify-between animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-5 w-32 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-3 w-full rounded-md" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-3">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-3 w-16 rounded-full" />
      </div>
    </div>
  );
};

export const FeatureHeaderSkeleton = () => {
  return (
    <div className="w-full bg-white">
      <header className="flex items-center justify-between px-8 pt-2 pb-2">
        <Skeleton className="h-6 w-40 rounded-md" />

        <div className="flex items-center gap-4 ml-auto">
          <Skeleton className="h-9 w-9 rounded-full" />

          <Skeleton className="h-9 w-9 rounded-full" />

          <div className="flex items-center gap-3 animate-pulse">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-24 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </header>
      <Skeleton className="h-px w-full" />
    </div>
  );
};

export const TableSkeleton = ({
  columns = 4,
  rows = 3,
}: {
  columns?: number;
  rows?: number;
}) => {
  return (
    <div className="w-full overflow-hidden border-t border-gray-100 animate-pulse">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-24 rounded-md" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rIdx) => (
            <tr
              key={rIdx}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {Array.from({ length: columns }).map((_, cIdx) => (
                <td key={cIdx} className="px-4 py-3">
                  <Skeleton className="h-4 w-full rounded-md" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const WalletCardStackSkeleton = () => {
  return (
    <div className="relative w-[354px] h-[359px] animate-pulse">
      <div className="absolute top-[37px] left-0 w-[354px] h-[210px] rounded-[15px] bg-gray-200" />

      <div className="absolute top-[187px] left-[15px] w-[324px] h-[172px] rounded-[15px] bg-gray-100/70 backdrop-blur-sm border border-gray-200" />

      <div className="absolute top-[60px] left-[30px] flex items-center gap-3">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>

      <Skeleton className="absolute top-[125px] left-[30px] h-5 w-[240px] rounded-md" />

      <div className="absolute bottom-[45px] left-[30px] flex items-center justify-between w-[250px]">
        <Skeleton className="h-3 w-10 rounded-md" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
};

export const ScheduledTransfersSkeleton = ({ rows = 4 }: { rows?: number }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm h-full w-full p-4 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-36 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
