import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface GeneralButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<GeneralButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      variant='contained'
      color='success'
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        margin: '10 PX',
        alignSelf: 'center',
        px: 3,
        backgroundColor: '#28a745',
        '&:hover': { backgroundColor: '#218838' },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
