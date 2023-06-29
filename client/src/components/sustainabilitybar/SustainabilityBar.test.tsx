import { render } from '@testing-library/react';
import SustainabilityBar from './SustainabilityBar';

describe('SustainabilityBar', () => {
  it('render title and index', () => {
    const title = 'Sustainability Score';
    const index = 65;

    const { getByText } = render(
      <SustainabilityBar title={title} index={index} />
    );

    const titleElement = getByText(title);
    const indexElement = getByText(`${index}%`);

    expect(titleElement).toBeInTheDocument();
    expect(indexElement).toBeInTheDocument();
  });

  it('check color based on score', () => {
    const title = 'Sustainability Score';
    const highIndex = 80;
    const mediumIndex = 50;
    const lowIndex = 30;

    const { container } = render(
      <SustainabilityBar title={title} index={highIndex} />
    );
    const highBar = container.querySelector('.text-lime-600');

    expect(highBar).toBeInTheDocument();

    const { container: container2 } = render(
      <SustainabilityBar title={title} index={mediumIndex} />
    );
    const mediumBar = container2.querySelector('.text-amber-300');

    expect(mediumBar).toBeInTheDocument();

    const { container: container3 } = render(
      <SustainabilityBar title={title} index={lowIndex} />
    );
    const lowBar = container3.querySelector('.text-orange-400');

    expect(lowBar).toBeInTheDocument();
  });
});
