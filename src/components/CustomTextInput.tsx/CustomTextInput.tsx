/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input } from '@/components/ui/input';
import { sanitizeInput } from "@/utils/security/xssProtection";

interface CustomTextInputProps {
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

const CustomTextInput: React.FC<CustomTextInputProps> = ({
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
}: CustomTextInputProps) => {
    const currentValue = value ?? (field ? field.value : "");
    const [isChanged, setIsChanged] = useState<boolean>(false);

    return (
        <Input
            id={id}
            disabled={disabled}
            className={`custom-input rounded-md border-gray-100 hover:border-blue-500 placeholder:text-gray-500 ${className ?? ''}`}
            type="text"
            divClassName={divClassName}
            placeholder={placeholder}
            maxLength={maxLength}
            value={currentValue}
            onChange={(e) => {
                setIsChanged(true)
                if (field?.onChange) {
                    field.onChange(e.target.value);
                } else if (onChange) {
                    onChange(e.target.value);
                }
            }}
            onKeyDown={onKeyDown}
            onBeforeInput={(e: any) => {
                const sanitized = sanitizeInput(e.data);
                if (sanitized !== e.data) {
                  e.preventDefault();
                }
              }}
            onBlur={(e) => {
                if (!isChanged) return;
                if (field?.onChange) {
                    field.onChange(e.target.value.trim());
                } else if (onChange) {
                    onChange(e.target.value.trim());
                }
            }}
        />
    );
};

export default CustomTextInput;
