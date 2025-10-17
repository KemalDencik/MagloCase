/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { sanitizeInput } from "@/utils/security/xssProtection";

interface CustomPasswordInputProps {
  id?: string;
  className?: string;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  field?: {
    value: string;
    onChange: (value: string) => void;
    [key: string]: any;
  };
  placeholder?: string;
  disabled?: boolean;
  divClassName?: string;
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  id,
  maxLength,
  value,
  onChange,
  onKeyDown,
  className,
  field,
  placeholder,
  disabled = false,
  divClassName,
}: CustomPasswordInputProps) => {
  const currentValue = value ?? (field ? field.value : "");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className={`custom-input rounded-md hover:border-blue-500 placeholder:text-gray-500 pr-12 ${
          className ?? ""
        }`}
        divClassName={divClassName}
        placeholder={placeholder ?? "••••••••"}
        maxLength={maxLength}
        value={currentValue}
        onChange={(e) => {
          setIsChanged(true);
          const sanitizedValue = sanitizeInput(e.target.value);
          if (field?.onChange) {
            field.onChange(sanitizedValue);
          } else if (onChange) {
            onChange(sanitizedValue);
          }
        }}
        onKeyDown={onKeyDown}
        onBeforeInput={(e: any) => {
          const sanitized = sanitizeInput(e.data);
          if (sanitized !== e.data) e.preventDefault();
        }}
        onBlur={(e) => {
          if (!isChanged) return;
          const trimmed = e.target.value.trim();
          if (field?.onChange) {
            field.onChange(trimmed);
          } else if (onChange) {
            onChange(trimmed);
          }
        }}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Show password" : "Hide password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 "
        disabled={disabled}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default CustomPasswordInput;
