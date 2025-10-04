export interface IMultimedia {
  id: number;
  producto_id: number;
  url: string;
  tipo: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: number;
  usuario_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  unidad_medida: 'kg' | 'unidad';
  stock: number;
  categoria: 'frutas' | 'verduras' | 'granos' | 'otros';
  ubicacion?: string;
  estado: 'disponible' | 'poco stock' | 'agotado';
  multimedia: IMultimedia[];
  quantity?: number;
}
