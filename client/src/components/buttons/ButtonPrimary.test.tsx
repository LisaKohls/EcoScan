import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonPrimary from './ButtonPrimary';

test('Check button click event', () => {
  const handleClick = jest.fn();

  const { getByText } = render(
    <ButtonPrimary onClick={handleClick}>Click me</ButtonPrimary>
  );

  const button = getByText('Click me');

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
