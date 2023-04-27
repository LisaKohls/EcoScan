import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders EcoScan text', () => {
    render(<App />);
    const ecoScanText = screen.getByText(/EcoScan/i);
    expect(ecoScanText).toBeInTheDocument();
});
