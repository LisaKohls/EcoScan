import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

describe('ProductCard component', () => {
  const mockProduct = {
    name: 'Test Product',
    description: 'This is a test product',
    barcode: 1234567890,
    image: 'test_image.jpg',
    favorite: true,
  };

  test('renders product details correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard {...mockProduct} />
      </BrowserRouter>
    );

    const productName = screen.getByText(mockProduct.name);
    const productDescription = screen.getByText(mockProduct.description);
    const productBarcode = screen.getByText(`${mockProduct.barcode}`);

    expect(productName).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productBarcode).toBeInTheDocument();
  });

  test('displays default image when no image provided', () => {
    const productWithoutImage = {
      ...mockProduct,
      image: '../../assets/noimage_placeholder.png',
    };

    render(
      <BrowserRouter>
        <ProductCard {...productWithoutImage} />
      </BrowserRouter>
    );

    const defaultImage = screen.getByAltText(productWithoutImage.name);

    expect(defaultImage).toHaveAttribute('src', '../../assets/noimage_placeholder.png');
  });
});

