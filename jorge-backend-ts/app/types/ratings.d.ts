export interface IRating {
  id: number;
  agricultor_id: number;
  comprador_id: number;
  pedido_id: number;
  puntuacion: number;
  comentario?: string;
  fecha: Date;
}
