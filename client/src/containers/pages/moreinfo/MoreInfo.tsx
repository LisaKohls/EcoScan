import { useContext, useEffect } from 'react';
import HeaderContext from '../../../contexts/HeaderProvider';

const MoreInfo = () => {
  const { setHeaderOptions } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderOptions({
      title: 'Information',
      backButton: true,
      rightIcon: null,
    });
  }, [setHeaderOptions]);

  return (
    <div className="mx-margin-elements">
      <h2 className="font-bold ">Sustainability Metrics</h2>
      <p className="break-words mx-1 whitespace-normal lg:mx-40">
        You can not only see the name and description of the product like on
        usual online shops but also its sustainability. The sustainability
        metrics show the lifetime and water usage of the product. If the product
        has a lifetime of 100 years, the bar will fill completely. A lifetime of
        100 is a good target we aim to achieve in other products as well. The
        water usage scale also ranges from 0 to 100, with 100 being the best
        rating and 0 being the worst. It is calculated based on factors such as
        the amount of water the product requires for production.
      </p>
      <h2 className="font-bold mt-6">Sustainability Indices</h2>
      <p className="break-words mx-1 whitespace-normal lg:mx-40">
        The Sustainability Indices provide information about the ethical aspects
        of the product. The Social Index is related to the working conditions of
        the employees. The ecological Index is an overall rating of the
        ecological aspect of the product.
      </p>
    </div>
  );
};

export default MoreInfo;
