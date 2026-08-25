import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/useAppDispatch';
import { logout } from '../../../store/authSlice';
import { LogoutButton } from '../../buttons/LogOutButton';
import { USER_TYPE } from '../private/PrivateHeader';

const PublicMenuDrawer = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleDrawer = (state: boolean) => () => setOpen(state);

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Productos', path: '/products' },
    ...(user?.tipo === USER_TYPE.COMPRADOR
      ? [{ text: 'Mi Panel', path: '/private' }]
      : []),
    ...(!isAuthenticated ? [{ text: 'Login', path: '/login' }] : []),
    {
      text: 'Carrito',
      path: '/cart',
      IconButton: <ShoppingCartIcon />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuIcon sx={{ color: 'black' }} />
      </IconButton>

      <Drawer
        anchor='left'
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: '#f3ede1', width: 250 },
        }}
      >
        {/* Header con logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Box
            component='img'
            src='/img/BioCan_Logo.png'
            alt='Biocan Logo'
            sx={{ height: 40, width: 'auto', mr: 1 }}
          />
          <Typography variant='h6' color='green'>
            BioCan
          </Typography>
        </Box>
        <Divider />

        {/* Enlaces del menú */}
        <List>
          {menuItems.map(({ text, path, IconButton }) => (
            <ListItem key={text} disablePadding onClick={toggleDrawer(false)}>
              <ListItemButton
                component={RouterLink}
                to={path}
                sx={{
                  '&:hover': {
                    backgroundColor: '#e0d7c3',
                  },
                }}
              >
                {/* Mostrar el icono si existe */}
                {IconButton && (
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    {IconButton}
                  </Box>
                )}
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ sx: { color: 'green' } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Cerrar sesión */}
        {isAuthenticated && (
          <>
            <Divider />
            <Box p={2}>
              <LogoutButton onClick={handleLogout} />
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
};

export default PublicMenuDrawer;
