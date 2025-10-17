/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface CustomFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: UseFormReturn<TFieldValues>['control'];
  name: TName;
  label?: string;
  title?: string;
  className?: string;
  labelClassName?: string;
  children: (field: any) => ReactNode;
  inline?: boolean;
  required?: boolean;
}

const CustomFormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  title,
  className,
  labelClassName,
  children,
  inline = false,
  required = false,
}: CustomFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex bg-transparent ${inline ? 'flex-row items-center' : 'flex-col'
            } ${className}`}
        >
          {label && (
            <FormLabel className={cn("field-label text-xs", labelClassName || (inline ? 'w-24' : 'w-full'))} htmlFor={name} title={title || label}>
              {label} {required ? <p className="text-red-600 inline animate-pulse">*</p> : ''}
            </FormLabel>
          )}
          <FormControl id={name}>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
