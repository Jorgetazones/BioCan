import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, updateUserData } from '../../../helper/commonHelper';
import { setCategory, setSearchText } from '../../../store/filterSlice';
import { RootState } from '../../../store/store';
import { DeleteButton } from '../../buttons/DeleteButton';
import { PrimaryButton } from '../../buttons/GeneralButton';
import { OutlinedButton } from '../../buttons/OutlinedButton';
import { USER_TYPE } from './PrivateHeader';

const categories = ['', 'frutas', 'verduras', 'otros'];

const ProductFilter = () => {
  const dispatch = useDispatch();

  return (
    <Box display='flex' gap={2} padding={2} minHeight='100vh' maxWidth={'100%'}>
      <TextField
        label='Buscar producto'
        onChange={(e) => dispatch(setSearchText(e.target.value))}
        fullWidth
      />
      <TextField
        select
        label='Categoría'
        onChange={(e) => dispatch(setCategory(e.target.value))}
        fullWidth
        defaultValue=''
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat || 'Todas'}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

const PrivatePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { category, searchText } = useSelector(
    (state: RootState) => state.filters
  );
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    id: user?.id,
    nombre: user?.nombre,
    direccion: user?.tipo === USER_TYPE.COMPRADOR ? user?.direccion || '' : '',
    ubicacion: user?.tipo === USER_TYPE.AGRICULTOR ? user?.ubicacion || '' : '',
    telefono: user?.telefono || '',
    web: user?.tipo === USER_TYPE.AGRICULTOR ? user?.web || '' : '',
  });
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setUserData({
        nombre: user?.nombre,
        id: user?.id,
        direccion:
          user?.tipo === USER_TYPE.COMPRADOR ? user?.direccion || '' : '',
        ubicacion:
          user?.tipo === USER_TYPE.AGRICULTOR ? user?.ubicacion || '' : '',
        telefono: user?.telefono || '',
        web: user?.tipo === USER_TYPE.AGRICULTOR ? user?.web || '' : '',
      });
    }
  }, [user]);

  // Cargar productos según el tipo de usuario
  useEffect(() => {
    if (user?.tipo === USER_TYPE.AGRICULTOR || user?.tipo === USER_TYPE.ADMIN) {
      const url =
        user.tipo === USER_TYPE.AGRICULTOR
          ? `/products/user/${user.id}`
          : '/products';

      fetchData({ url, method: 'GET' })
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch(() => alert('Error al cargar productos'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  // Cargar historial de pedidos para compradores
  useEffect(() => {
    if (user?.tipo === USER_TYPE.COMPRADOR) {
      setLoadingOrders(true);
      fetchData({ url: `/orders/user/${user.id}`, method: 'GET' })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error al cargar el historial de pedidos');
          }
          return res.json();
        })
        .then((data) => setOrders(data))
        .catch((err) => setErrorOrders(err.message))
        .finally(() => setLoadingOrders(false));
    }
  }, [user]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.categoria === category : true;
    const matchesSearchText =
      product.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearchText;
  });

  const handleEditUserData = async () => {
    try {
      if (!user) {
        alert('Usuario no autenticado');
        return;
      }
      const updated = await updateUserData(user.id, userData);
      alert(updated.message || 'Datos actualizados');
      setEditMode(false);
    } catch (err) {
      alert('Error al actualizar los datos');
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este producto?');
    if (!confirm) return;

    try {
      const response = await fetchData({
        url: `/products/${id}`,
        method: 'DELETE',
      });
      const result = await response.json();

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert('Producto eliminado correctamente');
      } else {
        alert(result.message || 'Error al eliminar');
      }
    } catch {
      alert('Error del servidor al eliminar');
    }
  };

  const renderUserProfile = () => (
    <Box>
      <Typography variant='h5' gutterBottom>
        Perfil de {user?.nombre}
      </Typography>
      <Typography variant='h6' color='textSecondary'>
        Tipo: {user?.tipo}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {editMode ? (
        <Grid container spacing={2}>
          {user?.tipo === USER_TYPE.COMPRADOR && (
            <Grid item xs={12}>
              <TextField
                label='Dirección'
                value={userData.direccion}
                onChange={(e) =>
                  setUserData({ ...userData, direccion: e.target.value })
                }
                fullWidth
                variant='outlined'
                sx={{ mb: 2 }}
              />
            </Grid>
          )}
          {user?.tipo === USER_TYPE.AGRICULTOR && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Ubicación'
                  value={userData.ubicacion}
                  onChange={(e) =>
                    setUserData({ ...userData, ubicacion: e.target.value })
                  }
                  fullWidth
                  variant='outlined'
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Web'
                  value={userData.web}
                  onChange={(e) =>
                    setUserData({ ...userData, web: e.target.value })
                  }
                  fullWidth
                  variant='outlined'
                  sx={{ mb: 2 }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              label='Teléfono'
              value={userData.telefono}
              onChange={(e) =>
                setUserData({ ...userData, telefono: e.target.value })
              }
              fullWidth
              variant='outlined'
              sx={{ mb: 2 }}
            />
          </Grid>
          <Box display='flex' gap={2} mt={2} ml={2}>
            <PrimaryButton onClick={handleEditUserData} sx={{ mb: 1 }}>
              Guardar cambios
            </PrimaryButton>
            <DeleteButton
              onClick={() => setEditMode(false)}
              sx={{ flex: 1, mb: 1 }}
            >
              Cancelar
            </DeleteButton>
          </Box>
        </Grid>
      ) : (
        <>
          {user?.tipo === USER_TYPE.COMPRADOR && (
            <Typography variant='body1'>
              Dirección: {userData.direccion || 'No disponible'}
            </Typography>
          )}
          {user?.tipo === USER_TYPE.AGRICULTOR && (
            <>
              <Typography variant='body1'>
                Ubicación: {userData.ubicacion || 'No disponible'}
              </Typography>
              <Typography variant='body1'>
                Web: {userData.web || 'No disponible'}
              </Typography>
            </>
          )}
          <Typography variant='body1'>
            Teléfono: {userData.telefono || 'No disponible'}
          </Typography>
          <PrimaryButton
            onClick={() => setEditMode(true)}
            sx={{ flex: 1, mb: 2, mt: 2 }}
          >
            Editar datos
          </PrimaryButton>
        </>
      )}
    </Box>
  );

  const renderProducts = () => (
    <>
      <Typography variant='h5' mb={2}>
        Gestión de productos
      </Typography>
      <ProductFilter />
      <PrimaryButton
        onClick={() => navigate('/private/productUploads')}
        sx={{ mb: 3 }}
      >
        Subir nuevo producto
      </PrimaryButton>

      {filteredProducts.length ? (
        filteredProducts.map((product) => {
          const imageUrl = product.multimedia?.[0]?.url
            ? `http://localhost:3000/uploads/${product.multimedia[0].url}`
            : '/src/data/img/BioCan_Logo.png';

          return (
            <Card key={product.id} variant='outlined' sx={{ mb: 2 }}>
              <CardContent>
                <CardActionArea component={Link} to={`/product/${product.id}`}>
                  <CardMedia
                    component='img'
                    height='200'
                    width='150'
                    image={imageUrl}
                    crossOrigin='anonymous'
                    alt={product.nombre}
                    sx={{ objectFit: 'cover' }}
                  />
                </CardActionArea>
                <Typography variant='h6'>{product.nombre}</Typography>
                <Typography>Descripción: {product.descripcion}</Typography>
                <Typography>Precio: {product.precio} €</Typography>
                <Typography>Stock: {product.stock}</Typography>
                <Typography>Unidad: {product.unidad_medida}</Typography>
                <Typography>Categoría: {product.categoria}</Typography>
                <Typography>Estado: {product.estado}</Typography>

                <Box mt={2} display='flex' gap={2}>
                  <OutlinedButton
                    variant='outlined'
                    onClick={() =>
                      navigate(`/private/productEdit/${product.id}`)
                    }
                  >
                    Editar
                  </OutlinedButton>
                  <DeleteButton
                    variant='contained'
                    color='error'
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </DeleteButton>
                </Box>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Typography>No hay productos disponibles</Typography>
      )}
    </>
  );

  const renderOrderHistory = () => {
    if (loadingOrders) {
      return <Typography>Cargando historial de pedidos...</Typography>;
    }

    if (errorOrders) {
      return <Typography color='error'>{errorOrders}</Typography>;
    }

    if (orders.length === 0) {
      return <Typography>No tienes pedidos registrados.</Typography>;
    }

    return orders.map((order) => (
      <Box>
        <Card key={order.id} variant='outlined' sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant='h6'>Pedido #{order.id}</Typography>
            <Typography>Total: {order.total}€</Typography>
            <Typography>Estado: {order.estado}</Typography>
            <Typography>Dirección de Envío: {order.direccion_envio}</Typography>
          </CardContent>
        </Card>
      </Box>
    ));
  };

  if (!user) return <Typography>Usuario no autenticado</Typography>;
  if (loading) return <Typography>Cargando...</Typography>;

  return (
    <Box p={4}>
      {renderUserProfile()}
      {user?.tipo === USER_TYPE.AGRICULTOR && renderProducts()}
      {user?.tipo === USER_TYPE.COMPRADOR && renderOrderHistory()}
    </Box>
  );
};

export default PrivatePage;
