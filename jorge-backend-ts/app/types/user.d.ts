export interface IUser {
  id?: number;
  nombre: string;
  tipo: 'agricultor' | 'comprador' | 'admin';
  password: string;
  telefono?: string;
  direccion?: string;
  ubicacion?: string;
  descripcion?: string;
  web?: string;
  redes_sociales?: string;
}

export interface IUserUpdated extends Omit<IUser, 'id'> {}
