import { FormControl, MenuItem, Select as MuiSelect, Typography } from '@mui/material';
import { Control, useController } from 'react-hook-form';
import React from 'react';

interface Option {
  value: any;
  label: string;
  isDisabled?: boolean;

}

interface SelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: Option[];
  className?: string;
  labelClassName?: string;
  defaultValue?: string;
  disabled?: boolean;
  rounded?: boolean;
  reason?: string;
  onValueChange?: (value: any) => void;
}

const Select = ({
  name,
  control,
  label,
  options,
  className,
  labelClassName,
  defaultValue = '',
  disabled = false,
  rounded = true,
  reason,
  onValueChange,
}: SelectProps) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedValue: any) => {
    if (selectedValue === value) {
      // User selected the same value again
      onValueChange?.(selectedValue);
    }
  };

  return (
    <div className={className}>
      {label && (
        <Typography component="label" htmlFor={name} className={labelClassName}>
          {label}
        </Typography>
      )}

      <FormControl fullWidth size="small" error={!!error}>
        <MuiSelect
          size="small"
          id={name}
          value={value}
          onChange={(e) => {
            onChange(e); // react-hook-form update
            onValueChange?.(e.target.value); // external handler
          }}
          displayEmpty
          defaultValue={defaultValue}
          disabled={disabled}
          inputRef={ref}
          sx={{
            borderRadius: rounded ? '50px' : '8px',
            backgroundColor: disabled ? '#f5f5f5' : 'inherit',
          }}
        >
          {value === '' && (
            <MenuItem disabled value="">
              <em>Select {label?.toLowerCase()}</em>
            </MenuItem>
          )}

          {options.map((opt) => (
            <MenuItem
              key={opt.value}
              value={opt.value}
              disabled={opt.isDisabled} // 👈 Apply disabled state here
              onClick={(e) => handleSelect(e, opt.value)}
            >
              {opt.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>

      {error?.message && (
        <Typography color="error" variant="caption">
          {error.message}
        </Typography>
      )}

      {reason && (
        <Typography color="error" variant="caption">
          {reason}
        </Typography>
      )}
    </div>
  );
};

export default Select;
