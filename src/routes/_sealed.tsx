import { AnimatedLayout } from "@/components/AnimatedLayout";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_sealed")({
  component: SealedLayout,
});

function SealedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate({ to: "/auth/login" });
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarTrigger />

        <div className="flex-grow p-3 overflow-auto relative">
          <AnimatedLayout />
        </div>
      </div>
    </SidebarProvider>
  );
}
