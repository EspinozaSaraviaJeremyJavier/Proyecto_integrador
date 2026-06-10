import { render, screen } from '@testing-library/react';
import Inicio from './funcionalidades/inicio/Inicio';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}), { virtual: true });

test('renders home page content', () => {
  render(<Inicio />);
  const linkElement = screen.getByText(/LO MÁS COMPRADO/i);
  expect(linkElement).toBeInTheDocument();
});
