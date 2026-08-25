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

// En minúscula, igual que el dump y los otros cinco modelos: MySQL en Linux
// distingue mayúsculas en los nombres de tabla, y 'OrderDetails' haría que
// sync() creara una tabla vacía aparte de la 'orderdetails' que trae los datos.
@Table({ tableName: 'orderdetails', timestamps: true })
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
