export interface IOrder {
  id: number;
  comprador_id: number;
  total: number;
  estado: 'pendiente' | 'confirmado' | 'enviado' | 'entregado' | 'cancelado';
  direccion_envio: string;
  metodo_pago: 'transferencia' | 'tarjeta';
  fecha_pedido: Date;
}

export type IOrderCreation = Omit<IOrder, 'id' | 'fecha_pedido'>;
