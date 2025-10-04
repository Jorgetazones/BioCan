import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import Orders from './Orders';
import Product from './Product';

@Table({ tableName: 'OrderDetails', timestamps: true })
class OrderDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Orders)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare pedido_id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare producto_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare cantidad: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare precio_unitario: number;

  @BelongsTo(() => Orders)
  declare order: Orders;

  @BelongsTo(() => Product)
  declare product: Product;
}

export default OrderDetails;
