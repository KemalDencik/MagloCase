import { createFileRoute } from "@tanstack/react-router";

const TransactionsPage = () => {
  return <div>TransactionsPage</div>;
};

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
});