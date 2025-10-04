import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

export const LogoutButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant='outlined'
    startIcon={<LogoutIcon />}
    onClick={onClick}
    sx={{
      color: '#215431',
      marginLeft: '2px',
      borderColor: '#215431',
      textTransform: 'none',
      fontWeight: 500,
      borderRadius: 2,
      '&:hover': {
        backgroundColor: '#e6f2ec',
        borderColor: '#1b4629',
      },
    }}
  >
    Cerrar sesión
  </Button>
);
