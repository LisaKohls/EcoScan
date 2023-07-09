import { render, screen, act } from '@testing-library/react';
import SustainabilityBar from './SustainabilityBar';

describe('SustainabilityBar component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should display the correct title', () => {
    render(<SustainabilityBar index={50} title="Energy" />);
    expect(screen.getByText('Energy')).toBeInTheDocument();
  });

  it('should display the correct percentage', () => {
    render(<SustainabilityBar index={50} title="Energy" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should have the correct color for given index', () => {
    const { rerender } = render(<SustainabilityBar index={75} title="Water" />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('Water')).toHaveStyle({ color: '#32CD32' });

    rerender(<SustainabilityBar index={45} title="Water" />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('Water')).toHaveStyle({ color: '#FFBF00' });

    rerender(<SustainabilityBar index={20} title="Water" />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('Water')).toHaveStyle({ color: '#FF7F00' });
  });

  it('should adjust progress bar width as per index', () => {
    render(<SustainabilityBar index={70} title="Energy" />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByRole('progressbar')).toHaveStyle({ width: '70%' });
  });
});
