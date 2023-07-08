import ButtonAddProduct from '../../../components/buttons/ButtonAddProduct';

const ProductNotFound = ({ barcode }: { barcode: string }) => {
  return (
    <>
      <div className="text-center font-bold">Barcode &quot;{barcode}&quot;</div>
      <div className="text-center m-margin-elements">Product not found</div>
      <ButtonAddProduct />
    </>
  );
};

export default ProductNotFound;
