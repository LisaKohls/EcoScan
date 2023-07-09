import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import ProductInfo from './ProductInfo';
import axios from 'axios';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../hooks/useAxiosPrivate');
jest.mock('axios');
jest.mock('react-chartjs-2');

describe('ProductInfo', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('renders loading animation when data is being fetched', () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockReturnThis();
    mockAxios.get.mockResolvedValue(
      new Promise(() => {
        /* Intentionally empty */
      })
    );

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

    // Check if loading animation is present
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders personal product details after successful API call', async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockReturnThis();
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: {
        name: 'Test Personal Product',
        description: 'This is a test personal product.',
        barcode: 123456789,
        isPersonalProduct: true,
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

    expect(screen.getByText('Test Personal Product')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test personal product.')
    ).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    // expect(screen.queryByText('Loading product...')).toBeNull();
  });

  it('renders regular product details after successful API call', async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockReturnThis();
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: {
        name: 'Test Regular Product',
        description: 'This is a test regular product.',
        barcode: 987654321,
        isPersonalProduct: false,
        image: null,
        favorite: false,
      },
    });

    (
      useAxiosPrivate as jest.MockedFunction<typeof useAxiosPrivate>
    ).mockReturnValue(mockAxios);

    render(
      <MemoryRouter initialEntries={['/products/987654321']}>
        <Routes>
          <Route path="/products/:barcode" element={<ProductInfo />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Test Regular Product')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test regular product.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    // expect(screen.queryByText('Loading product...')).toBeNull();
  });

  it('renders an error message when the product does not exist', async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockReturnThis();
    mockAxios.get.mockRejectedValue({ response: { status: 404 } });

    (
      useAxiosPrivate as jest.MockedFunction<typeof useAxiosPrivate>
    ).mockReturnValue(mockAxios);

    render(
      <MemoryRouter initialEntries={['/products/999999999']}>
        <Routes>
          <Route path="/products/:barcode" element={<ProductInfo />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

    expect(await screen.findByText(/Product not found/i)).toBeInTheDocument();
  });
});
