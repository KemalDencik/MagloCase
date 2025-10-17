"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";
import { TableSkeleton } from "@/components/Skeleton";

export interface CustomColumn<T> {
  header: string;
  key: keyof T;
  width?: string;
  alignment?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

interface CustomTableProps<T> {
  title?: string;
  columns: CustomColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  isExpanded?: boolean;
  onViewAllClick?: () => void;
}

export function CustomTable<T extends Record<string, unknown>>({
  title,
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data found",
  className,
  isExpanded = false,
  onViewAllClick,
}: CustomTableProps<T>) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-xl shadow-sm w-full flex flex-col overflow-hidden",
        className
      )}
    >
      {/* Header sabit */}
      {title && (
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sticky top-0 bg-white z-20">
          <h2 className="text-gray-800 font-semibold text-lg">{title}</h2>

          {onViewAllClick && (
            <button
              onClick={onViewAllClick}
              className="text-sm text-gray-500 hover:text-blue-600 transition"
            >
              <div className="flex items-center gap-2">
                <span>{isExpanded ? "Close" : "View all"}</span>
                {isExpanded ? (
                  <X className="w-4 h-4 mt-[2px]" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </div>
            </button>
          )}
        </div>
      )}

      <div className="flex-1 overflow-x-auto">
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className={cn(
                      "text-xs font-medium text-gray-500 uppercase py-2 px-4 bg-white text-left",
                      col.alignment === "center" && "!text-center",
                      col.alignment === "right" && "!text-right"
                    )}
                    style={{ width: col.width }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="p-0">
                    <TableSkeleton columns={columns.length} rows={3} />
                  </td>
                </tr>
              ) : data?.length > 0 ? (
                data.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className={cn(
                          "text-sm text-gray-700 py-3 px-4 text-left",
                          col.alignment === "center" && "!text-center",
                          col.alignment === "right" && "!text-right"
                        )}
                      >
                        {col.render
                          ? col.render(row)
                          : (String(row[col.key] ?? "") as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-5 text-gray-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
