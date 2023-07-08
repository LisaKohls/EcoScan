const Introduction = () => {
  return (
    <div className="max-w-lg mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Welcome to EcoScan</span>
        <span className="block text-indigo-600">
          Sustainability Information, Simplified.
        </span>
      </h2>
      <p className="mt-4 text-lg leading-6 text-gray-500">
        Search for a product by name or barcode to get detailed sustainability
        information.
      </p>
    </div>
  );
};

export default Introduction;
