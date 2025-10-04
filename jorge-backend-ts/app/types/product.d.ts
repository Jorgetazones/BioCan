export interface IProduct {
  id?: number;
  usuario_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  unidad_medida: 'kg' | 'unidad';
  stock: number;
  categoria: 'frutas' | 'verduras' | 'granos' | 'otros';
  ubicacion?: string;
  estado: 'disponible' | 'agotado' | 'poco stock';
}

export interface IProductUpdated {
  usuario_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  unidad_medida: 'kg' | 'unidad';
  stock: number;
  categoria: 'frutas' | 'verduras' | 'granos' | 'otros';
  ubicacion?: string;
  estado: 'disponible' | 'agotado' | 'poco stock';
}

//export interface IProductUpdated extends Omit<IProduct, 'id'> {}
