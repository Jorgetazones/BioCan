import { useSelector } from 'react-redux';
import ProductFilter from '../../components/product/ProductFilter';
import ProductsCards from '../../components/products/ProductCards';
import { useProducts } from '../../hook/useProducts';
import { RootState } from '../../store/store';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  const filters = useSelector((state: RootState) => state.filters);

  if (loading) return 'cargando...';
  if (error) return 'error';

  // Filtrar los productos según los filtros de Redux
  const filteredProducts = products.filter((product) => {
    // Aplicar el filtro de categoría
    const matchesCategory = filters.category
      ? product.categoria === filters.category
      : true;

    return matchesCategory;
  });

  return (
    <div>
      <ProductFilter />
      <ProductsCards products={filteredProducts} />
    </div>
  );
};

export default ProductsPage;
