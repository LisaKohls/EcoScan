import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ProductInfo from './ProductInfo';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

jest.mock('../../../hooks/useAxiosPrivate');
jest.mock('axios');

describe('ProductInfo', () => {
  it('renders product details after successful API call', async () => {
    // Mock axios instance
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockReturnThis(); // ensure that instance created by factory is also mocked
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: {
        name: 'Test Product',
        description: 'This is a test product.',
        barcode: 123456789,
        sustainabilityEco: 50,
        sustainabilitySocial: 30,
        isPersonalProduct: false,
        image: null,
        favorite: false,
      },
    });

    (
      useAxiosPrivate as jest.MockedFunction<typeof useAxiosPrivate>
    ).mockReturnValue(mockAxios);

    render(
      <MemoryRouter initialEntries={['/products/123456789']}>
        <Routes>
          <Route path="/products/:barcode" element={<ProductInfo />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product.')).toBeInTheDocument();
  });
});
