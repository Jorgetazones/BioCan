import { Button, ButtonProps } from '@mui/material';

interface OutlinedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      variant='outlined'
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        px: 3,
        color: '#33754b',
        borderColor: '#33754b',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
