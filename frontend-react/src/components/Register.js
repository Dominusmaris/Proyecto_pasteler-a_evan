import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar fortaleza de contraseña
    if (name === 'contraseña') {
      setPasswordStrength(validatePassword(value));
    }

    // Limpiar error cuando el usuario empieza a escribir
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    if (formData.nombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return false;
    }
    if (!formData.correo.trim()) {
      setError('El correo es obligatorio');
      return false;
    }
    if (!formData.correo.includes('@') || formData.correo.length < 5) {
      setError('Ingresa un correo válido (ej: test@email.com)');
      return false;
    }
    if (!formData.contraseña.trim()) {
      setError('La contraseña es obligatoria');
      return false;
    }
    if (formData.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    const usuario = {
      nombre: formData.nombre.trim(),
      correo: formData.correo.trim().toLowerCase(),
      contraseña: formData.contraseña,
      rol: 'CLIENTE'
    };

    try {
      const result = await register(usuario);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(result.error || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main style={{backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '3rem'}}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="success" style={{
                borderRadius: '20px',
                border: '2px solid #28a745',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <h3 style={{color: '#28a745', fontFamily: 'Pacifico, cursive'}}>
                  ¡Registro Exitoso!
                </h3>
                <p style={{fontSize: '1.1rem', margin: '1rem 0'}}>
                  Tu cuenta ha sido creada correctamente
                </p>
                <div style={{margin: '1.5rem 0'}}>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Redirigiendo al login en unos segundos...
                </div>
                <Link to="/login">
                  <Button variant="success" style={{fontWeight: 'bold'}}>
                    Ir al Login Ahora
                  </Button>
                </Link>
              </Alert>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }

  const getPasswordVariant = () => {
    if (passwordStrength < 50) return 'danger';
    if (passwordStrength < 75) return 'warning';
    return 'success';
  };

  const getPasswordText = () => {
    if (passwordStrength < 25) return 'Muy débil';
    if (passwordStrength < 50) return 'Débil';
    if (passwordStrength < 75) return 'Moderada';
    return 'Fuerte';
  };

  return (
    <main style={{backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '3rem'}}>
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card style={{border: '2px solid #8B4513', borderRadius: '20px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)'}}>
              <Card.Header style={{
                backgroundColor: '#FFC0CB',
                borderBottom: '2px solid #8B4513',
                borderRadius: '18px 18px 0 0',
                textAlign: 'center',
                padding: '1.5rem'
              }}>
                <h2 style={{
                  color: '#8B4513',
                  fontFamily: 'Pacifico, cursive',
                  fontSize: '2.5rem',
                  margin: 0
                }}>
                  📝 Crear Cuenta
                </h2>
                <p style={{color: '#666', fontSize: '1rem', margin: '0.5rem 0 0 0'}}>
                  Únete a la familia de Pastelería 1000 Sabores
                </p>
              </Card.Header>

              <Card.Body style={{padding: '2rem'}}>
                {error && (
                  <Alert variant="danger" style={{borderRadius: '10px'}}>
                    <strong>❌ Error:</strong> {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                      Nombre Completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      autoComplete="name"
                      style={{
                        border: '2px solid #8B4513',
                        borderRadius: '10px',
                        padding: '12px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                      Correo Electrónico
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      autoComplete="email"
                      style={{
                        border: '2px solid #8B4513',
                        borderRadius: '10px',
                        padding: '12px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                      Contraseña
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                        autoComplete="new-password"
                        style={{
                          border: '2px solid #8B4513',
                          borderRadius: '10px',
                          padding: '12px',
                          fontSize: '1rem',
                          paddingRight: '45px'
                        }}
                        required
                      />
                      <Button
                        variant="link"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          border: 'none',
                          background: 'none',
                          color: '#8B4513',
                          fontSize: '1.2rem'
                        }}
                        type="button"
                      >
                        {showPassword ? '●' : '○'}
                      </Button>
                    </div>
                    {formData.contraseña && (
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small style={{color: '#666'}}>Fortaleza:</small>
                          <small style={{color: '#666'}}>{getPasswordText()}</small>
                        </div>
                        <ProgressBar
                          variant={getPasswordVariant()}
                          now={passwordStrength}
                          style={{height: '6px'}}
                        />
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                      Confirmar Contraseña
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmarContraseña"
                        value={formData.confirmarContraseña}
                        onChange={handleChange}
                        placeholder="Repite tu contraseña"
                        autoComplete="new-password"
                        style={{
                          border: '2px solid #8B4513',
                          borderRadius: '10px',
                          padding: '12px',
                          fontSize: '1rem',
                          paddingRight: '45px'
                        }}
                        required
                      />
                      <Button
                        variant="link"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          border: 'none',
                          background: 'none',
                          color: '#8B4513',
                          fontSize: '1.2rem'
                        }}
                        type="button"
                      >
                        {showConfirmPassword ? '●' : '○'}
                      </Button>
                    </div>
                    {formData.confirmarContraseña && (
                      <div className="mt-2">
                        {formData.contraseña === formData.confirmarContraseña ? (
                          <small style={{color: '#28a745'}}>✅ Las contraseñas coinciden</small>
                        ) : (
                          <small style={{color: '#dc3545'}}>❌ Las contraseñas no coinciden</small>
                        )}
                      </div>
                    )}
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      disabled={loading || formData.contraseña !== formData.confirmarContraseña}
                      style={{
                        backgroundColor: '#8B4513',
                        border: '2px solid #8B4513',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        padding: '12px'
                      }}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Creando cuenta...
                        </>
                      ) : (
                        'Crear Mi Cuenta'
                      )}
                    </Button>
                  </div>

                  <hr style={{border: '1px solid #ddd', margin: '1.5rem 0'}} />

                  <div className="text-center">
                    <p style={{color: '#666', fontSize: '0.9rem', margin: '0 0 1rem 0'}}>
                      ¿Ya tienes una cuenta?
                    </p>
                    <Link to="/login">
                      <Button
                        variant="outline-primary"
                        style={{
                          border: '2px solid #007bff',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                          width: '100%',
                          padding: '10px'
                        }}
                      >
                        🔐 Iniciar Sesión
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <Card style={{
                border: '2px solid #8B4513',
                borderRadius: '15px',
                backgroundColor: 'rgba(255, 192, 203, 0.3)'
              }}>
                <Card.Body>
                  <h6 style={{color: '#8B4513', fontWeight: 'bold', margin: '0 0 0.5rem 0'}}>
                    Política de Privacidad
                  </h6>
                  <p style={{fontSize: '0.8rem', color: '#666', margin: 0}}>
                    Al crear una cuenta aceptas nuestros términos y condiciones.
                    Tus datos están seguros y no serán compartidos con terceros.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Register;