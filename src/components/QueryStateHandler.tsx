import React from "react";

interface QueryLike {
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
}

interface QueryStateHandlerProps {
  queries: QueryLike[];
  children: React.ReactNode;
}

export const QueryStateHandler = ({
  queries,
  children,
}: QueryStateHandlerProps) => {
  const isError = queries.some((q) => q.isError);
  const firstError = queries.find((q) => q.isError)?.error as Error | undefined;

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full w-full text-red-600">
        Hata oluştu: {firstError?.message ?? "Bilinmeyen hata"}
      </div>
    );
  }

  return <>{children}</>;
};
