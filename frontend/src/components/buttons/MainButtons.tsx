import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface MainButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const MainButton: React.FC<MainButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      variant='contained'
      color='success'
      size='large'
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        px: 3,
        margin: '20px',
        backgroundColor: '#28a745',
        '&:hover': { backgroundColor: '#218838' },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
