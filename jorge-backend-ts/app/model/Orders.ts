import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IOrder, IOrderCreation } from '../types/orders';
import OrderDetails from './OrderDetails';
import User from './User';

@Table({ tableName: 'orders', timestamps: true })
class Orders extends Model<IOrder, IOrderCreation> implements IOrder {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare comprador_id: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare total: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(
      'pendiente',
      'confirmado',
      'enviado',
      'entregado',
      'cancelado'
    ),
    defaultValue: 'pendiente',
  })
  declare estado:
    | 'pendiente'
    | 'confirmado'
    | 'enviado'
    | 'entregado'
    | 'cancelado';

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare direccion_envio: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('transferencia', 'tarjeta'),
  })
  declare metodo_pago: 'transferencia' | 'tarjeta';

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare fecha_pedido: Date;

  @HasMany(() => OrderDetails, { foreignKey: 'pedido_id', as: 'orderDetails' })
  declare orderDetails: OrderDetails[];
}

export default Orders;
