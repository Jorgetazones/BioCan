import bcryptjs from 'bcryptjs';
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IUser } from '../types/user';
import Orders from './Orders';
import Product from './Product';
import Ratings from './Ratings';

@Table({ tableName: 'users', timestamps: true })
class User extends Model<IUser> implements IUser {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare nombre: string;

  @AllowNull(false)
  @Column(DataType.ENUM('agricultor', 'comprador', 'admin'))
  declare tipo: 'agricultor' | 'comprador' | 'admin';

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare password: string;

  @AllowNull(true)
  @Column(DataType.STRING(20))
  declare telefono?: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  declare direccion: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  declare ubicacion?: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare descripcion?: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  declare web?: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare redes_sociales?: string;

  @HasMany(() => Product)
  declare products: Product[];

  @HasMany(() => Orders)
  declare orders: Orders[];

  @HasMany(() => Ratings, { foreignKey: 'agricultor_id' })
  declare receivedRatings: Ratings[];

  @HasMany(() => Ratings, { foreignKey: 'comprador_id' })
  declare givenRatings: Ratings[];

  // Hook para hashear la contraseña al crearla
  @BeforeCreate
  static async hashPasswordBeforeCreate(user: User) {
    user.password = await bcryptjs.hash(user.password, 10);
  }

  // Hook para hashear la contraseña si se modifica
  @BeforeUpdate
  static async hashPasswordBeforeUpdate(user: User) {
    if (user.changed('password')) {
      user.password = await bcryptjs.hash(user.password, 10);
    }
  }

  //Método para comparar la contraseña ingresada con la guardada en la BD
  async comparePassword(password: string): Promise<boolean> {
    return await bcryptjs.compare(password, this.password);
  }
}

export default User;
