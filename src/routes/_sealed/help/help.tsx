import { FeatureHeader } from "@/components/FeatureHeader";
import { createFileRoute } from "@tanstack/react-router";

export const HelpPage = () => {
  return (
    <>
          <FeatureHeader title="Help" />

    </>
  );
}

export const Route = createFileRoute("/help/help")({
  component: HelpPage,
});