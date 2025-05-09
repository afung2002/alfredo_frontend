import { FormControl, MenuItem, Select as MuiSelect, Typography } from '@mui/material';
import { Control, useController } from 'react-hook-form';

interface Option {
  value: any;
  label: string;
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
}: SelectProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <div className={className}>
      {label && (
        <Typography
          component="label"
          htmlFor={name}
          className={labelClassName}
        >
          {label}
        </Typography>
      )}
      <FormControl fullWidth size="small" error={!!error}>
        <MuiSelect
          size='small'
          id={name}
          value={value}
          onChange={onChange}
          displayEmpty
          disabled={disabled}
          sx={{
            borderRadius: rounded ? '50px' : '8px',
            backgroundColor: disabled ? '#f5f5f5' : 'inherit',
          }}
        >
          <MenuItem disabled value="">
            <em>Select {label?.toLowerCase()}</em>
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
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
