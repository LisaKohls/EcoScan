import ButtonAddProduct from '../../../components/buttons/ButtonAddProduct';

const ProductNotFound = ({ barcode }: { barcode: string }) => {
  return (
    <div>
      <div>Product not found with Barcode &quot;{barcode}&quot;</div>
      <ButtonAddProduct />
    </div>
  );
};

export default ProductNotFound;
