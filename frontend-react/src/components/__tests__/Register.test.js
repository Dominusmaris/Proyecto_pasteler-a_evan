import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';
import { AuthProvider } from '../../context/AuthContext';

// Mock del useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock del contexto de auth
const mockRegister = jest.fn();

jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    register: mockRegister
  })
}));

const RegisterWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <Register />
    </AuthProvider>
  </BrowserRouter>
);

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente los elementos principales', () => {
    render(<RegisterWrapper />);

    expect(screen.getByText('📝 Crear Cuenta')).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText('🔑 Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('🔑 Confirmar Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear mi cuenta/i })).toBeInTheDocument();
  });

  test('muestra error cuando las contraseñas no coinciden', async () => {
    render(<RegisterWrapper />);

    const passwordInput = screen.getByLabelText('🔑 Contraseña');
    const confirmPasswordInput = screen.getByLabelText('🔑 Confirmar Contraseña');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });

    expect(screen.getByText('❌ Las contraseñas no coinciden')).toBeInTheDocument();
  });

  test('muestra indicador de contraseña fuerte', () => {
    render(<RegisterWrapper />);

    const passwordInput = screen.getByLabelText('🔑 Contraseña');

    // Contraseña fuerte: mayúscula, minúscula, número, 8+ caracteres
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    expect(screen.getByText('Fuerte')).toBeInTheDocument();
  });

  test('muestra indicador de contraseña débil', () => {
    render(<RegisterWrapper />);

    const passwordInput = screen.getByLabelText('🔑 Contraseña');

    fireEvent.change(passwordInput, { target: { value: 'abc' } });

    expect(screen.getByText('Muy débil')).toBeInTheDocument();
  });

  test('valida que el nombre sea obligatorio', async () => {
    render(<RegisterWrapper />);

    const submitButton = screen.getByRole('button', { name: /crear mi cuenta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
    });
  });

  test('valida email inválido', async () => {
    render(<RegisterWrapper />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole('button', { name: /crear mi cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument();
    });
  });

  test('desabilita botón cuando las contraseñas no coinciden', () => {
    render(<RegisterWrapper />);

    const passwordInput = screen.getByLabelText('🔑 Contraseña');
    const confirmPasswordInput = screen.getByLabelText('🔑 Confirmar Contraseña');
    const submitButton = screen.getByRole('button', { name: /crear mi cuenta/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });

    expect(submitButton).toBeDisabled();
  });

  test('envía formulario con datos válidos', async () => {
    mockRegister.mockResolvedValue({ success: true });

    render(<RegisterWrapper />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText('🔑 Contraseña');
    const confirmPasswordInput = screen.getByLabelText('🔑 Confirmar Contraseña');
    const submitButton = screen.getByRole('button', { name: /crear mi cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        nombre: 'Juan Pérez',
        correo: 'juan@test.com',
        contraseña: 'password123',
        rol: 'CLIENTE'
      });
    });
  });

  test('muestra mensaje de éxito después del registro', async () => {
    mockRegister.mockResolvedValue({ success: true });

    render(<RegisterWrapper />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText('🔑 Contraseña');
    const confirmPasswordInput = screen.getByLabelText('🔑 Confirmar Contraseña');
    const submitButton = screen.getByRole('button', { name: /crear mi cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('🎉 ¡Registro Exitoso!')).toBeInTheDocument();
    });
  });
});