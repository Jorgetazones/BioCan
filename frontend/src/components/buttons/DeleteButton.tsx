import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface DeleteButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      variant='contained'
      color='error'
      sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
      {...props}
    >
      {children}
    </Button>
  );
};
