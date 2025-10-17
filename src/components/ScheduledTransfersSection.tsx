import React from "react";
import { ScheduledTransfer } from "@/api/models";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import { ScheduledTransfersSkeleton } from "./Skeleton";
import { formatAmount } from "@/utils/currencyUtils";

type ScheduledTransfersSectionProps = {
  transfers?: ScheduledTransfer[];
  isLoading?: boolean;
  onViewAll?: () => void;
};

export const ScheduledTransfersSection: React.FC<
  ScheduledTransfersSectionProps
> = ({ transfers = [], isLoading = false, onViewAll }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm h-full w-full p-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-semibold text-gray-900">
          Scheduled Transfers
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm text-gray-500 hover:text-blue-600 transition"
        >
          <div className="flex items-center gap-2">
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <ScheduledTransfersSkeleton />
        ) : transfers.length === 0 ? (
          <div className="text-gray-400 text-sm text-center">
            No scheduled transfers
          </div>
        ) : (
          <ul className="space-y-3">
            {transfers.map((t) => {
              const time = new Date(t.date).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <li
                  key={t.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[15px] font-medium text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-[13px] text-gray-500">
                        {formatDate(t.date, t.currency === "TRY" ? "TR" : "EN")}{" "}
                        at {time}
                      </p>
                    </div>
                  </div>

                  <div className="text-[15px] font-semibold text-gray-900">
                    {t.amount < 0 ? "-" : "+"}
                    {formatAmount(Math.abs(t.amount), t.currency)}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
