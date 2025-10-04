import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IProduct } from '../types/product';
import Multimedia from './Multimedia';
import OrderDetails from './OrderDetails';
import User from './User';

@Table({ tableName: 'product', timestamps: true })
class Product extends Model<IProduct> implements IProduct {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare usuario_id: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare nombre: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare descripcion?: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare precio: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('kg', 'unidad'),
    defaultValue: 'unidad',
  })
  declare unidad_medida: 'kg' | 'unidad';

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    defaultValue: 1,
  })
  declare stock: number;

  @AllowNull(false)
  @Column(DataType.ENUM('frutas', 'verduras', 'granos', 'otros'))
  declare categoria: 'frutas' | 'verduras' | 'granos' | 'otros';

  @AllowNull(true)
  @Column(DataType.STRING(255))
  declare ubicacion?: string;

  @AllowNull(true)
  @Column({
    type: DataType.ENUM('disponible', 'agotado', 'poco stock'),
    defaultValue: 'disponible',
  })
  declare estado: 'disponible' | 'agotado' | 'poco stock';

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => OrderDetails)
  declare orderDetails: OrderDetails[];

  @HasMany(() => Multimedia)
  declare multimedia: Multimedia[];
}

export default Product;
