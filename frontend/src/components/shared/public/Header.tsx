import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/useAppDispatch';
import { logoutUser } from '../../../store/authSlice';
import { LogoutButton } from '../../buttons/LogOutButton';
import { USER_TYPE } from '../private/PrivateHeader';
import PublicMenuDrawer from './PublicMenuDrawer';
import ShoppingCartCustom from './ShoppingCartCustom';

export const Header = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      px={4}
      py={2}
      sx={{ backgroundColor: '#f3ede1' }}
    >
      <RouterLink to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component='img'
          src='/src/data/img/BioCan_Logo.png'
          alt='Biocan Logo'
          sx={{ height: 60, width: 'auto' }}
        />
      </RouterLink>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PublicMenuDrawer />
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 3,
          alignItems: 'center',
        }}
      >
        <RouterLink
          to='/products'
          style={{ color: 'black', textDecoration: 'none' }}
        >
          Productos
        </RouterLink>

        {user?.tipo === USER_TYPE.COMPRADOR && (
          <RouterLink
            to='/private'
            style={{ color: 'black', textDecoration: 'none' }}
          >
            Mi Panel
          </RouterLink>
        )}
        {user?.tipo === USER_TYPE.ADMIN && (
          <RouterLink
            to='/private'
            style={{ color: 'black', textDecoration: 'none' }}
          >
            BackOffice
          </RouterLink>
        )}

        {!isAuthenticated && (
          <RouterLink
            to='/login'
            style={{ color: 'black', textDecoration: 'none' }}
          >
            Login
          </RouterLink>
        )}
        {isAuthenticated && <LogoutButton onClick={handleLogout} />}

        <RouterLink
          to='/cart'
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <ShoppingCartCustom />
        </RouterLink>
      </Box>
    </Box>
  );
};
