export const formatAmount = (
  amount: number | string | null | undefined,
  currency?: string
): string => {
  if (amount === null || amount === undefined || amount === "") return "";

  const num = Number(amount);
  if (isNaN(num)) return "";

  const symbol = currency === "TRY" ? "₺" : "$";

  const formatted = num.toLocaleString(currency === "TRY" ? "tr-TR" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return currency === "TRY"
    ? `${formatted} ${symbol}`
    : `${symbol}${formatted}`;
};
