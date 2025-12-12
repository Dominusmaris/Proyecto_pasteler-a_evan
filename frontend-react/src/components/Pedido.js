import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Pedido() {
  const navigate = useNavigate();
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: '',
    specialInstructions: '',
    paymentMethod: 'efectivo'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para procesar el pedido
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 3000);
  };

  const deliveryOptions = [
    { value: 'tienda', label: '🏪 Retiro en tienda', price: 'Gratis' },
    { value: 'domicilio', label: '🚚 Delivery a domicilio', price: '$2.000' },
    { value: 'express', label: '⚡ Express (mismo día)', price: '$4.000' }
  ];

  const paymentMethods = [
    { value: 'efectivo', label: '💵 Efectivo', description: 'Pago al recibir' },
    { value: 'transferencia', label: '🏦 Transferencia', description: 'Banco Estado/Chile' },
    { value: 'tarjeta', label: '💳 Tarjeta', description: 'Débito/Crédito' }
  ];

  return (
    <main style={{backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '2rem'}}>
      <Container>
        <header className="text-center mb-5">
          <h1 style={{
            color: '#8B4513',
            fontFamily: 'Pacifico, cursive',
            fontSize: '3.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            🛒 Realizar Pedido
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1.2rem',
            fontStyle: 'italic'
          }}>
            Completa tus datos y disfruta nuestros deliciosos productos
          </p>
        </header>

        {showSuccess && (
          <Alert variant="success" className="text-center">
            <h4>¡Pedido realizado con éxito! 🎉</h4>
            <p>Te contactaremos pronto para confirmar los detalles</p>
          </Alert>
        )}

        <Row>
          <Col lg={8}>
            <Card style={{border: '2px solid #8B4513', borderRadius: '15px'}}>
              <Card.Header style={{backgroundColor: '#FFC0CB', borderBottom: '2px solid #8B4513'}}>
                <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                  📝 Datos del Pedido
                </h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                          Nombre Completo *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={orderForm.name}
                          onChange={handleInputChange}
                          placeholder="Tu nombre completo"
                          required
                          style={{border: '2px solid #8B4513'}}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                          Teléfono *
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={orderForm.phone}
                          onChange={handleInputChange}
                          placeholder="+56 9 1234 5678"
                          required
                          style={{border: '2px solid #8B4513'}}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={orderForm.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      style={{border: '2px solid #8B4513'}}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                      Dirección de Entrega
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      value={orderForm.address}
                      onChange={handleInputChange}
                      placeholder="Calle, número, comuna, región"
                      style={{border: '2px solid #8B4513'}}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                          Fecha de Entrega
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="deliveryDate"
                          value={orderForm.deliveryDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          style={{border: '2px solid #8B4513'}}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                          Método de Pago
                        </Form.Label>
                        <Form.Select
                          name="paymentMethod"
                          value={orderForm.paymentMethod}
                          onChange={handleInputChange}
                          style={{border: '2px solid #8B4513'}}
                        >
                          {paymentMethods.map(method => (
                            <option key={method.value} value={method.value}>
                              {method.label} - {method.description}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold', color: '#8B4513'}}>
                      Instrucciones Especiales
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="specialInstructions"
                      value={orderForm.specialInstructions}
                      onChange={handleInputChange}
                      placeholder="Alergias, preferencias, dedicatorias especiales, etc."
                      style={{border: '2px solid #8B4513'}}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      size="lg"
                      style={{
                        backgroundColor: '#8B4513',
                        border: '2px solid #8B4513',
                        fontWeight: 'bold',
                        padding: '12px'
                      }}
                    >
                      🛒 Confirmar Pedido
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="mb-4" style={{border: '2px solid #8B4513', borderRadius: '15px'}}>
              <Card.Header style={{backgroundColor: '#FFE4E1', borderBottom: '2px solid #8B4513'}}>
                <h4 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                  🚚 Opciones de Entrega
                </h4>
              </Card.Header>
              <Card.Body>
                {deliveryOptions.map(option => (
                  <div key={option.value} className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{color: '#555'}}>{option.label}</span>
                    <Badge bg="success">{option.price}</Badge>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card className="mb-4" style={{border: '2px solid #8B4513', borderRadius: '15px'}}>
              <Card.Header style={{backgroundColor: '#FFC0CB', borderBottom: '2px solid #8B4513'}}>
                <h4 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                  📞 Contacto Directo
                </h4>
              </Card.Header>
              <Card.Body>
                <p style={{color: '#555', marginBottom: '1rem'}}>
                  ¿Prefieres hacer tu pedido por teléfono?
                </p>
                <div className="text-center">
                  <Button
                    variant="outline-success"
                    style={{
                      border: '2px solid #28a745',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      width: '100%'
                    }}
                  >
                    📞 +56 9 8765 4321
                  </Button>
                  <Button
                    variant="outline-info"
                    style={{
                      border: '2px solid #17a2b8',
                      fontWeight: 'bold',
                      width: '100%'
                    }}
                  >
                    💬 WhatsApp
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card style={{border: '2px solid #8B4513', borderRadius: '15px'}}>
              <Card.Header style={{backgroundColor: '#FFE4E1', borderBottom: '2px solid #8B4513'}}>
                <h4 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                  ⏰ Horarios de Atención
                </h4>
              </Card.Header>
              <Card.Body>
                <ul style={{color: '#555', listStyle: 'none', padding: 0}}>
                  <li><strong>Lun-Vie:</strong> 8:00 - 20:00</li>
                  <li><strong>Sábados:</strong> 9:00 - 18:00</li>
                  <li><strong>Domingos:</strong> 10:00 - 16:00</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <section className="text-center mt-5">
          <Card style={{
            border: '2px solid #8B4513',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 192, 203, 0.3)'
          }}>
            <Card.Body>
              <h4 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive'}}>
                ¿Aún no has elegido tus productos?
              </h4>
              <p style={{color: '#666'}}>
                Explora nuestro delicioso catálogo antes de hacer tu pedido
              </p>
              <Button
                onClick={() => navigate('/productos')}
                style={{
                  backgroundColor: '#FFC0CB',
                  color: '#8B4513',
                  border: '2px solid #8B4513',
                  fontWeight: 'bold',
                  padding: '10px 30px'
                }}
              >
                🧁 Ver Productos
              </Button>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </main>
  );
}

export default Pedido;