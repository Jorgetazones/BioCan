import { Box, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { updateUserData } from '../../../helper/commonHelper';
import { useAppSelector } from '../../../hook/useAppDispatch';
import { PrimaryButton } from '../../buttons/GeneralButton';
import { USER_TYPE } from './PrivateHeader';

const ProfileSection = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    id: user?.id,
    nombre: user?.nombre || '',
    direccion: user?.tipo === USER_TYPE.COMPRADOR ? user?.direccion || '' : '',
    ubicacion: user?.tipo === USER_TYPE.AGRICULTOR ? user?.ubicacion || '' : '',
    telefono: user?.telefono || '',
    web: user?.tipo === USER_TYPE.AGRICULTOR ? user?.web || '' : '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditUserData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) {
        alert('Usuario no autenticado');
        return;
      }
      const updated = await updateUserData(user.id, userData);
      alert(updated.message || 'Datos actualizados');
    } catch (err) {
      alert('Error al actualizar los datos');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Editar mis datos
      </Typography>
      <Box component='form' onSubmit={handleEditUserData}>
        <TextField
          label='Nombre de usuario'
          name='nombre'
          value={userData.nombre}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Teléfono'
          name='telefono'
          value={userData.telefono}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        {/* Mostrar campo Dirección solo para comprador */}
        {user?.tipo === USER_TYPE.COMPRADOR && (
          <TextField
            label='Dirección'
            name='direccion'
            value={userData.direccion}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
        )}
        {/* Mostrar campos solo para agricultor */}
        {user?.tipo === USER_TYPE.AGRICULTOR && (
          <>
            <TextField
              label='Ubicación'
              name='ubicacion'
              value={userData.ubicacion}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Web'
              name='web'
              value={userData.web}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
          </>
        )}
        <PrimaryButton type='submit' variant='contained' color='primary'>
          Guardar cambios
        </PrimaryButton>
      </Box>
    </Paper>
  );
};

export default ProfileSection;
