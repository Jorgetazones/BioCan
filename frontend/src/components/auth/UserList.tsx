import { Box, Button, Typography } from '@mui/material';

interface UserListProps {
  users: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Box mt={4}>
      <Typography variant='h6' gutterBottom>
        Lista de usuarios registrados
      </Typography>
      {users.map((u) => (
        <Box
          key={u.id}
          mb={2}
          p={2}
          border={1}
          borderColor='grey.300'
          borderRadius={2}
        >
          <Typography>
            <strong>Nombre:</strong> {u.nombre}
          </Typography>
          <Typography>
            <strong>Tipo:</strong> {u.tipo}
          </Typography>
          <Box mt={1} display='flex' gap={2}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => onEdit(u.id)}
            >
              Editar
            </Button>
            <Button
              variant='outlined'
              color='error'
              onClick={() => onDelete(u.id)}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default UserList;
