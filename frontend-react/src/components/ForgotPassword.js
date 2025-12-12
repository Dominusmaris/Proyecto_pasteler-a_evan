import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulación de envío de email (aquí iría la lógica real)
    setTimeout(() => {
      setSent(true);
      setMessage('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
      setLoading(false);
    }, 2000);
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
                  🔓 Recuperar Contraseña
                </h2>
                <p style={{color: '#666', fontSize: '1rem', margin: '0.5rem 0 0 0'}}>
                  Te ayudamos a recuperar el acceso a tu cuenta
                </p>
              </Card.Header>

              <Card.Body style={{padding: '2rem'}}>
                {sent ? (
                  <Alert variant="success" style={{borderRadius: '10px', textAlign: 'center'}}>
                    <h5>📧 ¡Correo Enviado!</h5>
                    <p>{message}</p>
                    <small style={{color: '#666'}}>
                      Revisa también tu carpeta de spam
                    </small>
                  </Alert>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <p style={{color: '#666', fontSize: '1rem'}}>
                        Ingresa tu correo electrónico y te enviaremos instrucciones para crear una nueva contraseña
                      </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                          📧 Correo Electrónico
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          {loading ? '📤 Enviando...' : '📤 Enviar Instrucciones'}
                        </Button>
                      </div>
                    </Form>
                  </>
                )}

                <hr style={{border: '1px solid #ddd', margin: '1.5rem 0'}} />

                <div className="text-center">
                  <p style={{color: '#666', fontSize: '0.9rem', margin: '0 0 1rem 0'}}>
                    ¿Recordaste tu contraseña?
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
                      🔐 Volver al Login
                    </Button>
                  </Link>
                </div>
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
                    💡 ¿Necesitas ayuda?
                  </h6>
                  <p style={{fontSize: '0.8rem', color: '#666', margin: 0}}>
                    Si no recibes el correo o tienes problemas, contáctanos:<br/>
                    📞 +56 9 8765 4321 | 📧 ayuda@pasteleria1000sabores.com
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

export default ForgotPassword;