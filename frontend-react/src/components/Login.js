import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.correo.trim()) {
      setError('El correo es obligatorio');
      return false;
    }
    if (!formData.contraseña.trim()) {
      setError('La contraseña es obligatoria');
      return false;
    }
    if (!formData.correo.includes('@')) {
      setError('Ingresa un correo válido');
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

    try {
      const result = await login(formData.correo, formData.contraseña);

      if (result.success) {
        // Pequeña pausa para mostrar éxito antes de redirigir
        setTimeout(() => {
          // Redirigir según el rol del usuario
          if (isAdmin()) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 500);
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '3rem'}}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
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
                  🔐 Iniciar Sesión
                </h2>
                <p style={{color: '#666', fontSize: '1rem', margin: '0.5rem 0 0 0'}}>
                  Accede a tu cuenta en Pastelería 1000 Sabores
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
                      📧 Correo Electrónico
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
                      🔑 Contraseña
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        placeholder="Tu contraseña"
                        autoComplete="current-password"
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
                        {showPassword ? '🙈' : '👁️'}
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="text-center mb-3">
                    <Link
                      to="/forgot-password"
                      style={{
                        color: '#8B4513',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      disabled={loading}
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
                          Iniciando sesión...
                        </>
                      ) : (
                        '🚀 Iniciar Sesión'
                      )}
                    </Button>
                  </div>

                  <hr style={{border: '1px solid #ddd', margin: '1.5rem 0'}} />

                  <div className="text-center">
                    <p style={{color: '#666', fontSize: '0.9rem', margin: '0 0 1rem 0'}}>
                      ¿No tienes una cuenta?
                    </p>
                    <Link to="/register">
                      <Button
                        variant="outline-success"
                        style={{
                          border: '2px solid #28a745',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                          width: '100%',
                          padding: '10px'
                        }}
                      >
                        📝 Crear Cuenta Nueva
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
                    🛡️ Usuarios de Prueba
                  </h6>
                  <div style={{fontSize: '0.8rem', color: '#666'}}>
                    <div><strong>Admin:</strong> admin@pasteleria.com / admin123</div>
                    <div><strong>Cliente:</strong> cliente@test.com / cliente123</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Login;