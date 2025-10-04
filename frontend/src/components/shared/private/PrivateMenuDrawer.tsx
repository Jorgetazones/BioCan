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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/useAppDispatch';
import { logoutUser } from '../../../store/authSlice';
import { LogoutButton } from '../../buttons/LogOutButton';
import { USER_TYPE } from './PrivateHeader';

const PrivateMenuDrawer = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const toggleDrawer = (state: boolean) => () => setOpen(state);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setOpen(false);
    navigate('/login');
  };

  const getMenuItems = () => {
    switch (user?.tipo) {
      case USER_TYPE.AGRICULTOR:
        return [
          { text: 'Inicio', path: '/private' },
          { text: 'Subir Productos', path: '/private/productUploads' },
        ];
      case USER_TYPE.ADMIN:
        return [
          { text: 'Panel de Administración', path: '/private/admin' },
          { text: 'Administración de Usuarios', path: '/private/usersAdmin' },
        ];
      case USER_TYPE.COMPRADOR:
        return [
          { text: 'Página Pública', path: '/' },
          { text: 'Panel de Información', path: '/private' },
          { text: 'Editar Perfil', path: '/private/account/edit' },
        ];
      default:
        return [];
    }
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
        PaperProps={{ sx: { backgroundColor: '#f5f5f5', width: 250 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h6'>Hola {user?.nombre}</Typography>
        </Box>
        <Divider />
        <List>
          {getMenuItems().map(({ text, path }) => (
            <ListItem key={text} disablePadding onClick={toggleDrawer(false)}>
              <ListItemButton
                component={RouterLink}
                to={path}
                sx={{ '&:hover': { backgroundColor: '#e0d7c3' } }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding onClick={toggleDrawer(false)}>
            <ListItemButton component={RouterLink} to='/private/orders'>
              <ListItemText primary='Historial' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={toggleDrawer(false)}>
            <ListItemButton component={RouterLink} to='/cart'>
              <ShoppingCartIcon sx={{ mr: 1 }} />
              <ListItemText primary='Carrito' />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <Box p={2}>
          <LogoutButton
            onClick={() => {
              handleLogout();
            }}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default PrivateMenuDrawer;
