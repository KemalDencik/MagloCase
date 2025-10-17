import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
      {...props}
    />
  );
}

export const SkeletonImage = () => (
  <Skeleton className="h-52 w-full md:w-full mb-4 md:mb-0" />
);

export const SkeletonText = () => <Skeleton className="h-6 w-3/4 mb-2" />;

export const SkeletonIcon = () => <Skeleton className="w-12 h-12 rounded-lg" />;

export const SkeletonInput = () => <Skeleton className="h-10 w-full" />;

export const SkeletonTextarea = () => <Skeleton className="h-20 w-full mb-4" />;
export const SkeletonButton = () => <Skeleton className="h-12 w-full mb-4" />;

export { Skeleton };
