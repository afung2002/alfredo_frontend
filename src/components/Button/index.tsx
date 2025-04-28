import { Button as MuiButton, ButtonProps } from '@mui/material';

interface IButtonProps extends ButtonProps {
  className?: string;
  variant?: 'text' | 'outlined' | 'contained';
}

const Button = ({ className, children, variant, ...props }: IButtonProps) => {
  return (
    <MuiButton
      variant={variant ?? 'contained'}
          sx={{
            flexShrink: 0,
            textTransform: "none",
            borderRadius: "2px",
            // "&:hover": {
            //   bgcolor: "rgba(0, 0, 0, 0.8)",
            // },
          }}
      {...props}
      className={`shrink-0 px-4 ${className ?? ''}`}
      // sx={{
      //   borderRadius: '50px',   // Fully rounded, like your OutlinedInput
      //   boxShadow: 'none',      // Flat/2D style (no elevation)
      //   textTransform: 'none',  // Keep original casing
      //   fontWeight: 500,        // Consistent with Material Design text button
      //   padding: '6px 16px',  // Consistent with Material Design text button
      // }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;