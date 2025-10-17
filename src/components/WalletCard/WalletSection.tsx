import React from "react";
import { WalletCardStack } from "@/components/WalletCard/WalletCardStack";
import { CardDto } from "@/api/models";
import { WalletCardStackSkeleton } from "../Skeleton";

type WalletSectionProps = {
  cards?: CardDto[];
  isLoading?: boolean;
};

export const WalletSection: React.FC<WalletSectionProps> = ({
  cards,
  isLoading,
}) => {
  const hasCards = !!cards && cards.length > 0;

  return (
    <div className="flex flex-col bg-white h-full p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-900">Wallet</h2>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <WalletCardStackSkeleton />
        ) : hasCards ? (
          <WalletCardStack cards={cards} />
        ) : (
          <div className="text-gray-400 text-sm">No wallet data</div>
        )}
      </div>
    </div>
  );
};
