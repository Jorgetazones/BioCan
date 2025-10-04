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
import Product from './Product';

@Table({ tableName: 'multimedia', timestamps: true })
class Multimedia extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare producto_id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare url: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('imagen', 'video'),
    defaultValue: 'imagen',
  })
  declare tipo: 'imagen' | 'video';

  @BelongsTo(() => Product)
  declare product: Product;
}

export default Multimedia;
