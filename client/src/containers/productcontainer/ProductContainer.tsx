import React from 'react';
import ProductCard from '../../components/productcard/ProductCard';

interface Product {
  name: string;
  description: string;
  barcode: number;
  image: string;
  favorite: boolean;
}

interface ProductContainerProps {
  products: Product[];
}

const ProductContainer: React.FC<ProductContainerProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductContainer;
