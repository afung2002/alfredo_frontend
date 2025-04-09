import { Button as MuiButton, ButtonProps } from '@mui/material';

interface IButtonProps extends ButtonProps {
  className?: string;
}

const Button = ({ className, children, ...props }: IButtonProps) => {
  return (
    <MuiButton
      variant="contained"
      size="small"
      {...props}
      className={`shrink-0 px-4 ${className ?? ''}`}
      sx={{
        borderRadius: '50px',   // Fully rounded, like your OutlinedInput
        boxShadow: 'none',      // Flat/2D style (no elevation)
        textTransform: 'none',  // Keep original casing
        fontWeight: 500,        // Consistent with Material Design text button
        padding: '6px 16px',  // Consistent with Material Design text button
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;