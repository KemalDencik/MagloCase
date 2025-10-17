import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Banknote,
  FileText,
  Wallet2,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logoutUser());

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      url: "/dashboard",
    },
    {
      title: "Transactions",
      icon: <Banknote className="h-4 w-4" />,
      url: "/transactions",
    },
    {
      title: "Invoices",
      icon: <FileText className="h-4 w-4" />,
      url: "/invoices",
    },
    {
      title: "My Wallets",
      icon: <Wallet2 className="h-4 w-4" />,
      url: "/my_wallet",
    },
    {
      title: "Settings",
      icon: <Settings className="h-4 w-4" />,
      url: "/settings",
    },
  ];

  return (
    <Sidebar
      className="bg-[#FAFAFA] text-gray-900 border-r border-gray-200"
      style={{ width: "250px", height: "900px" }}
      variant="inset"
      {...props}
    >
      <SidebarHeader className="bg-[#FAFAFA] px-6 py-4">
        <div className="flex items-center gap-2">
          <img
            src="/assets/Exclude.png"
            alt="Logo"
            className="w-[30px] h-[30px] object-contain"
          />
          <span className="text-lg font-bold text-gray-900">Maglo.</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#FAFAFA] flex flex-col justify-between h-full">
        <div className="px-6">
          <SidebarMenu className="mt-3 space-y-2">
            {sidebarItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-[12px] font-medium rounded-xl transition-colors w-[200px] h-[48px] px-[15px] py-[14px] ${
                      currentPath === item.url
                        ? "bg-[#C8EE44] text-gray-900"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        <SidebarFooter className="bg-[#FAFAFA] pb-36 px-6">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/help/help"
                  className={`flex items-center gap-[12px] font-medium rounded-[8px] transition-colors w-[200px] h-[48px] px-[15px] py-[14px] ${
                    currentPath === "/help/help"
                      ? "bg-[#C8EE44] text-gray-900"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-[12px] font-medium rounded-[8px] transition-colors text-gray-500 hover:bg-gray-100 w-[200px] h-[48px] px-[15px] py-[14px]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
