import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthProvider } from '../../context/AuthContext';

// Mock del useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock del contexto de auth
const mockLogin = jest.fn();
const mockIsAdmin = jest.fn();

jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    login: mockLogin,
    isAdmin: mockIsAdmin
  })
}));

const LoginWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </BrowserRouter>
);

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente los elementos principales', () => {
    render(<LoginWrapper />);

    expect(screen.getByText('🔐 Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('muestra error cuando el email está vacío', async () => {
    render(<LoginWrapper />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
    });
  });

  test('muestra error cuando el email es inválido', async () => {
    render(<LoginWrapper />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument();
    });
  });

  test('muestra/oculta contraseña al hacer click en el botón', () => {
    render(<LoginWrapper />);

    const passwordInput = screen.getByLabelText(/contraseña/i);
    const toggleButton = screen.getByRole('button', { name: '👁️' });

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  test('envía formulario con datos válidos', async () => {
    mockLogin.mockResolvedValue({ success: true });
    mockIsAdmin.mockReturnValue(false);

    render(<LoginWrapper />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123');
    });
  });

  test('muestra estado de carga durante el login', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

    render(<LoginWrapper />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Iniciando sesión...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});