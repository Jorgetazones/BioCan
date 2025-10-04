import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/useAppDispatch';
import { logoutUser } from '../../../store/authSlice';
import { LogoutButton } from '../../buttons/LogOutButton';
import PrivateMenuDrawer from './PrivateMenuDrawer';

export const USER_TYPE = {
  ADMIN: 'admin',
  AGRICULTOR: 'agricultor',
  COMPRADOR: 'comprador',
};

const PrivateHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#f5f5f5',
          maxWidth: '100%',
        }}
      >
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <PrivateMenuDrawer />
        </Box>

        <Typography
          variant='h6'
          sx={{
            flexGrow: 1,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Bienvenido {user?.nombre}
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {user?.tipo === USER_TYPE.AGRICULTOR && (
            <>
              <Link to='/private' style={{ color: 'black' }}>
                Inicio
              </Link>
              <Link to='productUploads' style={{ color: 'black' }}>
                Subir Productos
              </Link>
            </>
          )}
          {user?.tipo === USER_TYPE.ADMIN && (
            <>
              <Link to='/private/admin' style={{ color: 'black' }}>
                Panel de Administración
              </Link>
              <Link to='/private/usersAdmin' style={{ color: 'black' }}>
                Administración de Usuarios
              </Link>
            </>
          )}
          {user?.tipo === USER_TYPE.COMPRADOR && (
            <>
              <Link to='/' style={{ color: 'black' }}>
                Página Pública
              </Link>
              <Link to='/private' style={{ color: 'black' }}>
                Panel de Información
              </Link>
              <Link to='account/edit' style={{ color: 'black' }}>
                Editar Perfil
              </Link>
              <Link to='/private/orders' style={{ color: 'black' }}>
                Historial
              </Link>
            </>
          )}

          <LogoutButton onClick={handleLogout}></LogoutButton>
          <Link to='/cart' style={{ color: 'black' }}>
            <ShoppingCartIcon />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default PrivateHeader;
