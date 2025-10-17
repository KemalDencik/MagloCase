import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  divClassName?: string;
  divStyle?: React.CSSProperties;
  subWidth?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, divClassName, divStyle, subWidth = '0', type, label, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const isValueFilled = value !== undefined ? String(value).length > 0 : false;

    return (
      <div
        className={cn('relative', divClassName)}
        style={divStyle ? divStyle : { width: `calc(100% - ${subWidth})` }}
      >
        <input
          type={type}
          className={cn(
            type == 'date' ? 'block' : 'flex',
            'h-10 w-full rounded-md border border-[var(--input-border)]  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus:placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80',
            // DEĞİŞİKLİK 4: Input doluyken padding-top ekledik label'ı daha iyi göstermek için
            isValueFilled && 'pt-4',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={ref}
          value={value}
          placeholder={label}
          {...props}
        />
        {label && (
          <label
            className={cn(
              'absolute left-3 pointer-events-none transition-all duration-200',
              isFocused || isValueFilled // DEĞİŞİKLİK 5: isFilled yerine isValueFilled kullanıyoruz
                ? 'top-0 text-xs text-primary bg-background px-1 -translate-y-1/2'
                : 'top-1/2 text-sm text-muted-foreground -translate-y-1/2'
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
