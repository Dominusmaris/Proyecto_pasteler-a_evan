import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { AuthProvider } from '../../context/AuthContext';

// Mock del useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>
}));

const mockOnCartOpen = jest.fn();

const HeaderWrapper = ({ user = null, isLoggedIn = false, isAdmin = false }) => {
  // Mock del contexto de auth
  const mockAuthContext = {
    user,
    logout: jest.fn(),
    isLoggedIn: () => isLoggedIn,
    isAdmin: () => isAdmin
  };

  return (
    <BrowserRouter>
      <div>
        {React.cloneElement(<Header cartCount={3} onCartOpen={mockOnCartOpen} />, {},
          React.createElement(
            'div',
            {
              'data-testid': 'auth-context-provider',
              value: mockAuthContext
            }
          )
        )}
      </div>
    </BrowserRouter>
  );
};

// Mock del useAuth hook
const mockAuthHook = {
  user: null,
  logout: jest.fn(),
  isLoggedIn: () => false,
  isAdmin: () => false
};

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => mockAuthHook
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthHook.user = null;
    mockAuthHook.isLoggedIn = () => false;
    mockAuthHook.isAdmin = () => false;
  });

  test('renderiza correctamente el logo y navegación', () => {
    render(<HeaderWrapper />);

    expect(screen.getByText('Pastelería 1000 Sabores')).toBeInTheDocument();
    expect(screen.getByText('50 años')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Origen')).toBeInTheDocument();
    expect(screen.getByText('Impacto')).toBeInTheDocument();
    expect(screen.getByText('Pedido')).toBeInTheDocument();
  });

  test('muestra botón de carrito con contador correcto', () => {
    render(<HeaderWrapper />);

    expect(screen.getByText('🧺 Carrito')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('abre carrito al hacer click en botón', () => {
    render(<HeaderWrapper />);

    const cartButton = screen.getByText('🧺 Carrito').closest('button');
    fireEvent.click(cartButton);

    expect(mockOnCartOpen).toHaveBeenCalledTimes(1);
  });

  test('muestra botones de login/registro cuando no está logueado', () => {
    render(<HeaderWrapper />);

    expect(screen.getByText('🔑 Login')).toBeInTheDocument();
    expect(screen.getByText('📝 Registro')).toBeInTheDocument();
  });

  test('muestra información del usuario cuando está logueado', () => {
    mockAuthHook.user = { correo: 'test@test.com', rol: 'CLIENTE' };
    mockAuthHook.isLoggedIn = () => true;

    render(<HeaderWrapper />);

    expect(screen.getByText('👤 test@test.com')).toBeInTheDocument();
  });

  test('muestra opción de panel admin para usuarios admin', () => {
    mockAuthHook.user = { correo: 'admin@test.com', rol: 'ADMIN' };
    mockAuthHook.isLoggedIn = () => true;
    mockAuthHook.isAdmin = () => true;

    render(<HeaderWrapper />);

    // Hacer click en el dropdown del usuario
    const userDropdown = screen.getByText('👤 admin@test.com');
    fireEvent.click(userDropdown);

    expect(screen.getByText('🛡️ Panel Admin')).toBeInTheDocument();
  });

  test('navega a productos al hacer click en "Ver Catálogo"', () => {
    render(<HeaderWrapper />);

    const catalogButton = screen.getByText('🧁 Ver Catálogo');
    fireEvent.click(catalogButton);

    expect(mockNavigate).toHaveBeenCalledWith('/productos');
  });

  test('navega a login al hacer click en botón login', () => {
    render(<HeaderWrapper />);

    const loginButton = screen.getByText('🔑 Login');
    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('navega a registro al hacer click en botón registro', () => {
    render(<HeaderWrapper />);

    const registerButton = screen.getByText('📝 Registro');
    fireEvent.click(registerButton);

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  test('muestra rol del usuario en el dropdown', () => {
    mockAuthHook.user = { correo: 'test@test.com', rol: 'CLIENTE' };
    mockAuthHook.isLoggedIn = () => true;

    render(<HeaderWrapper />);

    // Hacer click en el dropdown del usuario
    const userDropdown = screen.getByText('👤 test@test.com');
    fireEvent.click(userDropdown);

    expect(screen.getByText('Rol: CLIENTE')).toBeInTheDocument();
  });
});