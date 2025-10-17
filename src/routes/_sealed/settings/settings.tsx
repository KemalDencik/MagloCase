import { createFileRoute } from "@tanstack/react-router";

const Settings = ()=>{
  return <div>Settings Page</div>
}
export const Route = createFileRoute("/settings")({
  component: Settings,
});