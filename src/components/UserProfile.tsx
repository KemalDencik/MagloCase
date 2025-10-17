import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useFetchUserProfile } from "@/api/queries";
import { SkeletonUserProfile } from "./Skeleton";

export const UserProfile = () => {
  const { data: user, isLoading, isError } = useFetchUserProfile();

  if (isLoading) return <SkeletonUserProfile />;
  if (isError)
    return <span className="text-sm text-red-500">Failed to load profile</span>;

  const fullName = user?.data.fullName || "User";
  const email = user?.data.email || "user@example.com";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
    flex items-center gap-3 bg-[#FAFAFA] rounded-full px-3 py-2 
    hover:bg-gray-100 transition
    focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
  "
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt={fullName}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-gray-900">
              {fullName}
            </span>
            <span className="text-xs text-gray-500">{email}</span>
          </div>

          <ChevronDown className="h-4 w-4 text-gray-600 ml-2" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-48 mt-2 bg-[#FAFAFA] border border-gray-200 shadow-sm"
        align="end"
      >
        <DropdownMenuLabel className="text-sm text-gray-500">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-gray-100">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100">
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
