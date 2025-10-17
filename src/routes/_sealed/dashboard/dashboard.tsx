import { useState } from "react";
import {
  useFetchSummary,
  useFetchWorkingCapital,
  useFetchTransactions,
  useFetchWallet,
  useFetchScheduledTransfers,
} from "@/api/queries";
import { FeatureHeader } from "@/components/FeatureHeader";
import { SummaryCard } from "@/components/SummaryCard";
import { QueryStateHandler } from "@/components/QueryStateHandler";
import { createFileRoute } from "@tanstack/react-router";
import { Wallet2, CreditCard, PiggyBank } from "lucide-react";
import {
  FeatureHeaderSkeleton,
  SummaryCardSkeletonGroup,
  WorkingCapitalChartSkeleton,
} from "@/components/Skeleton";
import { WorkingCapitalTrendChart } from "@/components/WorkingCapitalTrendChart";
import { Transaction } from "@/api/models";
import { formatDate } from "@/utils/dateUtils";
import {
  CustomColumn,
  CustomTable,
} from "@/components/CustomTable/CustomTable";
import { WalletSection } from "@/components/WalletCard/WalletSection";
import { ScheduledTransfersSection } from "@/components/ScheduledTransfersSection";
import { formatAmount } from "@/utils/currencyUtils";

export const DashboardPage = () => {
  const [showAll, setShowAll] = useState(false);
  const limit = showAll ? undefined : 3;

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    error: summaryError,
  } = useFetchSummary();

  const {
    data: workingCapitalData,
    isLoading: isCapitalLoading,
    isError: isCapitalError,
    error: capitalError,
  } = useFetchWorkingCapital();

  const {
    data: transactionsData,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
    error: transactionsError,
  } = useFetchTransactions(limit);

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
    error: walletError,
  } = useFetchWallet();

  const {
    data: scheduledTransfersData,
    isLoading: isScheduledTransfersLoading,
    isError: isScheduledTransfersError,
    error: scheduledTransfersError,
  } = useFetchScheduledTransfers();

  const queries = [
    { isError: isSummaryError, error: summaryError },
    { isError: isCapitalError, error: capitalError },
    { isError: isTransactionsError, error: transactionsError },
    { isError: isWalletError, error: walletError },
    { isError: isScheduledTransfersError, error: scheduledTransfersError },
  ];

  const summary = summaryData?.data;
  const workingCapital = workingCapitalData?.data;
  const transactions = transactionsData?.data.transactions ?? [];
  const scheduledTransfers = scheduledTransfersData?.data.transfers ?? [];

  const columns: CustomColumn<Transaction>[] = [
    {
      header: "Name / Business",
      key: "name",
      width: "40%",
      alignment: "left",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.business}
            className="w-8 h-8 rounded-md"
          />
          <div>
            <span className="text-sm font-medium">{row.name}</span>
            <span className="block text-xs text-gray-500">{row.business}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      key: "type",
      alignment: "center",
    },
    {
      header: "Amount",
      key: "amount",
      alignment: "center",
      render: (row) => (
        <span>{formatAmount(Math.abs(row.amount), row.currency)}</span>
      ),
    },
    {
      header: "Date",
      key: "date",
      alignment: "center",
      render: (row) => (
        <span className="text-sm text-gray-700">
          {formatDate(row.date, row.currency === "TRY" ? "TRY" : "")}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-x-hidden">
      {isSummaryLoading || isCapitalLoading ? (
        <FeatureHeaderSkeleton />
      ) : (
        <FeatureHeader
          title="Dashboard"
          actionGroup={{
            search: {
              label: "Search",
              onClick: (arg?: unknown) => {
                const searchTerm = (arg as string) || "";
                console.log(searchTerm);
              },
            },
            help: {
              label: "Help",
              onClick: () => console.log("Help clicked"),
            },
          }}
        />
      )}

      <QueryStateHandler queries={queries}>
        <div className="flex flex-col xl:flex-row flex-1 min-h-0">
          <div
            className="flex-1 p-2 grid gap-2"
            style={{ gridTemplateRows: "auto 1fr 1fr" }}
          >
            <div className="flex flex-wrap gap-4 w-full justify-between">
              {isSummaryLoading ? (
                <SummaryCardSkeletonGroup />
              ) : (
                <>
                  <div className="flex-1 min-w-[200px]">
                    <SummaryCard
                      title="Total balance"
                      amount={summary?.totalBalance.amount ?? 0}
                      currency={summary?.totalBalance.currency}
                      icon={<Wallet2 className="w-5 h-5" />}
                      active
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <SummaryCard
                      title="Total spending"
                      amount={summary?.totalExpense.amount ?? 0}
                      currency={summary?.totalExpense.currency}
                      icon={<CreditCard className="w-5 h-5" />}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <SummaryCard
                      title="Total saved"
                      amount={summary?.totalSavings.amount ?? 0}
                      currency={summary?.totalSavings.currency}
                      icon={<PiggyBank className="w-5 h-5" />}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="bg-white flex items-center justify-center mt-2 mb-2 rounded-xl shadow-sm">
              {isCapitalLoading ? (
                <WorkingCapitalChartSkeleton />
              ) : workingCapital ? (
                <WorkingCapitalTrendChart
                  data={workingCapital.data}
                  currency={workingCapital.currency}
                />
              ) : (
                <div className="text-gray-500">Veri bulunamadı</div>
              )}
            </div>

            <div className="bg-white flex flex-col rounded-xl shadow-sm">
              <CustomTable
                title="Recent Transactions"
                columns={columns}
                data={transactions}
                isLoading={isTransactionsLoading}
                emptyMessage="No recent transactions"
                isExpanded={showAll}
                onViewAllClick={() => setShowAll((prev) => !prev)}
              />
            </div>
          </div>

          <div className="w-full xl:w-1/3 flex flex-col h-full mt-4 xl:mt-0">
            <div className="flex-[2.5]">
              <WalletSection
                cards={walletData?.data?.cards ?? []}
                isLoading={isWalletLoading}
              />
            </div>

            <div className="flex-[2.5] bg-white flex items-center justify-center">
              <ScheduledTransfersSection
                transfers={scheduledTransfers}
                isLoading={isScheduledTransfersLoading}
                onViewAll={() => console.log("View all transfers clicked")}
              />
            </div>
          </div>
        </div>
      </QueryStateHandler>
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});
