import { createFileRoute } from "@tanstack/react-router";

const MyWallet = ()=>{
  return <div>My Wallet</div>
}
export const Route = createFileRoute("/my_wallet")({
  component: MyWallet,
});