import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/utils/currencyUtils";

interface SummaryCardProps {
  title: string;
  amount: number | string;
  currency?: string;
  icon: ReactNode;
  active?: boolean;
}

export const SummaryCard = ({
  title,
  amount,
  currency = "",
  icon,
  active = false,
}: SummaryCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center border transition-all duration-200 shadow-sm flex-1 min-w-[160px]",
        active
          ? "bg-gray-800 text-white border-gray-800"
          : "bg-gray-50 text-gray-900 border-gray-200 hover:shadow-md"
      )}
      style={{
        height: "105px",
        borderRadius: "10px",
        padding: "24px 20px",
        gap: "15px",
      }}
    >
      <div className="flex items-center justify-center gap-3">
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0",
            active
              ? "bg-lime-400/20 text-lime-400"
              : "bg-gray-200 text-gray-600"
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center items-center text-center">
          <p
            className={cn(
              "text-sm font-medium mb-1 truncate",
              active ? "text-gray-200" : "text-gray-500"
            )}
          >
            {title}
          </p>

          <p
            className={cn(
              "text-2xl font-semibold leading-none break-words",
              active ? "text-white" : "text-gray-900"
            )}
          >
            {formatAmount(amount, currency)}
          </p>
        </div>
      </div>
    </div>
  );
};
