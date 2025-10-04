import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../helper/commonHelper';
import { DeleteButton } from '../../buttons/DeleteButton';
import { OutlinedButton } from '../../buttons/OutlinedButton';

interface Usuario {
  id: number;
  nombre: string;
  tipo: string;
  telefono?: string;
  direccion?: string;
  ubicacion?: string;
  descripcion?: string;
  web?: string;
  redes_sociales?: string;
}

const UsersAdmin = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetchData({ url: '/users', method: 'GET' });
        const data: Usuario[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Error al cargar los usuarios');
      }
    };

    fetchAllUsers();
  }, []);

  const handleSaveUser = async (id: number, updatedUser: Usuario) => {
    try {
      const response = await fetchData({
        url: `/users/${id}`,
        method: 'PUT',
        body: JSON.parse(JSON.stringify(updatedUser)),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      const updatedData = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updatedData : user))
      );
      setEditMode((prev) => ({ ...prev, [id]: false }));
      setSuccessMessage('Usuario actualizado con éxito');
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  const handleCancelEdit = (id: number) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
  };

  const handleDeleteUser = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirm) return;

    try {
      const response = await fetchData({
        url: `/users/${id}`,
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setSuccessMessage('Usuario eliminado con éxito');
    } catch (err) {
      setError('Error al eliminar el usuario');
    }
  };

  const renderUserManagement = () => (
    <Box mt={4} mx='auto' maxWidth={700}>
      <Typography
        variant='h5'
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 4,
          textAlign: 'center',
          letterSpacing: 1,
        }}
      >
        Lista de usuarios registrados
      </Typography>
      {users.map((user) => (
        <Box
          key={user.id}
          mb={4}
          p={4}
          boxShadow={6}
          borderRadius={4}
          sx={{
            backgroundColor: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            color: '#0f172a',
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: '#e2e8f0',
              cursor: 'pointer',
            },
          }}
        >
          {editMode[user.id] ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Nombre'
                  value={user.nombre}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u.id === user.id ? { ...u, nombre: e.target.value } : u
                      )
                    )
                  }
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Teléfono'
                  value={user.telefono || ''}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u.id === user.id
                          ? { ...u, telefono: e.target.value }
                          : u
                      )
                    )
                  }
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              {user.tipo === 'AGRICULTOR' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Ubicación'
                    value={user.ubicacion || ''}
                    onChange={(e) =>
                      setUsers((prevUsers) =>
                        prevUsers.map((u) =>
                          u.id === user.id
                            ? { ...u, ubicacion: e.target.value }
                            : u
                        )
                      )
                    }
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
              )}
              {user.tipo === 'COMPRADOR' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Dirección'
                    value={user.direccion || ''}
                    onChange={(e) =>
                      setUsers((prevUsers) =>
                        prevUsers.map((u) =>
                          u.id === user.id
                            ? { ...u, direccion: e.target.value }
                            : u
                        )
                      )
                    }
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Web'
                  value={user.web || ''}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u.id === user.id ? { ...u, web: e.target.value } : u
                      )
                    )
                  }
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' gap={2} mt={2}>
                  <Button
                    variant='contained'
                    color='success'
                    onClick={() => handleSaveUser(user.id, user)}
                    sx={{ minWidth: 120, fontWeight: 'bold' }}
                  >
                    Guardar
                  </Button>
                  <OutlinedButton onClick={() => handleCancelEdit(user.id)}>
                    Cancelar
                  </OutlinedButton>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box>
              <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
                {user.nombre}
              </Typography>
              <Typography>
                <strong>Teléfono:</strong> {user.telefono || 'No disponible'}
              </Typography>
              {user.tipo === 'AGRICULTOR' && (
                <Typography>
                  <strong>Ubicación:</strong>{' '}
                  {user.ubicacion || 'No disponible'}
                </Typography>
              )}
              {user.tipo === 'COMPRADOR' && (
                <Typography>
                  <strong>Dirección:</strong>{' '}
                  {user.direccion || 'No disponible'}
                </Typography>
              )}
              <Typography>
                <strong>Web:</strong> {user.web || 'No disponible'}
              </Typography>
              <Box mt={2} display='flex' gap={2}>
                <OutlinedButton
                  onClick={() =>
                    setEditMode((prev) => ({ ...prev, [user.id]: true }))
                  }
                >
                  Editar
                </OutlinedButton>
                <DeleteButton>Eliminar</DeleteButton>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box>
      {successMessage && (
        <Alert severity='success' sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {renderUserManagement()}
    </Box>
  );
};

export default UsersAdmin;
