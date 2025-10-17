import { createFileRoute } from "@tanstack/react-router";

const InvoicesPage = () => {
  return <div>Invoices Page</div>;
}
export const Route = createFileRoute("/invoices")({
  component: InvoicesPage,
});