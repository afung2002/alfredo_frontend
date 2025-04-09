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
}

const Input = ({ name, control, className, labelClassName, defaultValue, label, reason, ...props }: IInputProps) => {
  const { field: { onChange, value }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue,
  });
  return (
    <div className={className}>
      {
        label && (
          <Typography
            className={labelClassName}
            component="label"
            htmlFor={label}>
            {label}
          </Typography>
        )
      }
      <OutlinedInput
        size="small"
        {...props}
        className="w-full p-1"
        sx={{borderRadius: '50px'}}
        id={label}
        name={name}
        value={value}
        onChange={onChange} />
      {
          error?.message && (
            <Typography
              color="error"
              variant="caption">
              {error.message}
            </Typography>
          )
        }
      {
          reason && (
            <Typography
              color="error"
              variant="caption">
              {reason}
            </Typography>
          )
        }
    </div>
  );
};

export default Input;
