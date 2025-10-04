import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Orders from './Orders';
import User from './User';

@Table({ tableName: 'ratings', timestamps: true })
class Ratings extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare agricultor_id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare comprador_id: number;

  @ForeignKey(() => Orders)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare pedido_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare puntuacion: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare comentario?: string;

  @BelongsTo(() => User, { foreignKey: 'agricultor_id' })
  declare agricultor: User;

  @BelongsTo(() => User, { foreignKey: 'comprador_id' })
  declare comprador: User;

  @BelongsTo(() => Orders)
  declare order: Orders;
}

export default Ratings;
