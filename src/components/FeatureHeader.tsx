import { Bell, Search } from "lucide-react";
import { JSX, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { IActionGroupItem } from "../types";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { UserProfile } from "./UserProfile";

interface FeatureHeaderProps {
  title?: string | JSX.Element;
  actionGroup?: {
    search?: IActionGroupItem;
    help?: IActionGroupItem;
  };
}

export const FeatureHeader = ({ title, actionGroup }: FeatureHeaderProps) => {
  const { search, help } = actionGroup ?? {};

  const { watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  const searchTerm = watch("search");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (search?.onClick) search.onClick(debouncedSearchTerm);
  }, [debouncedSearchTerm, search]);

  return (
    <div className="w-full bg-white">
      <header className="flex items-center justify-between px-2  pt-2 pb-2">
        {title && (
          <div>
            {title && (
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 ml-auto">
          {search && (
            <Button
              onClick={() => search.onClick()}
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {help && (
            <Button
              onClick={() => help.onClick()}
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
            >
              <Bell className="h-5 w-5" />
            </Button>
          )}

          <UserProfile />
        </div>
      </header>

      <Separator className="mt-2" />
    </div>
  );
};
