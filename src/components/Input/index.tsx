import { OutlinedInput, Typography } from '@mui/material';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { Control, useController } from 'react-hook-form';

interface IInputProps extends OutlinedInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  className?: string;
  defaultValue?: string;
  labelClassName?: string;
  isGroupInputs?: boolean;
  reason?: string;
  rounded?: boolean;
}

const Input = ({
  name,
  control,
  className,
  labelClassName,
  defaultValue,
  label,
  reason,
  rounded = false,
  type = 'text',
  ...props
}: IInputProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  // For file inputs, don't bind value directly, and handle FileList properly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'file') {
      onChange(e.target.files); // pass FileList to RHF
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={className}>
      {label && (
        <Typography
          sx={{ color: props.disabled ? 'text.disabled' : '' }}
          className={labelClassName}
          component="label"
          htmlFor={label}
        >
          {label}
        </Typography>
      )}
      <OutlinedInput
        size="small"
        {...props}
        className="w-full"
        sx={{
          borderRadius: rounded ? '50px' : '8px',
          '&.Mui-disabled': {
            backgroundColor: '#f5f5f5',
          },
        }}
        id={label}
        name={name}
        type={type}
        onChange={handleChange}
        // avoid binding value to file input to prevent React warning
        {...(type === 'file' ? {} : { value })}
      />
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

export default Input;
