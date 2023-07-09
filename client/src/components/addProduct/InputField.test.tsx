import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField component', () => {
  it('renders the input field correctly', () => {
    const label = 'Username';
    const value = 'testuser';
    const placeholder = 'Enter your username';
    const onChange = jest.fn();
    const onBlur = jest.fn();

    render(
      <InputField
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    );

    // Check if the label, input, and placeholder are rendered correctly
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('calls onChange callback when input value changes', () => {
    const onChange = jest.fn();
    const value = '';

    render(<InputField label="Test" value={value} onChange={onChange} />);

    const inputElement = screen.getByRole('textbox');
    const testValue = 'test';

    fireEvent.change(inputElement, { target: { value: testValue } });

    // Check if the onChange callback was called with the correct value
    expect(onChange).toHaveBeenCalledWith(testValue);
  });

  it('calls onBlur callback when input loses focus', () => {
    const onBlur = jest.fn();

    render(
      <InputField label="Test" value="" onChange={() => {}} onBlur={onBlur} />
    );

    const inputElement = screen.getByRole('textbox');

    fireEvent.blur(inputElement);

    // Check if the onBlur callback was called
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error prop is provided', () => {
    const error = 'Invalid input';

    render(
      <InputField label="Test" value="" onChange={() => {}} error={error} />
    );

    const errorMessage = screen.getByText(error);

    // Check if the error message is rendered correctly
    expect(errorMessage).toBeInTheDocument();
  });
});
