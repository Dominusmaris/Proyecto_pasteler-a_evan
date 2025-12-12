import React from 'react';
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const ClienteDashboard = () => {
  const { user } = useAuth();

  // Datos simulados de pedidos (en un caso real vendría del backend)
  const pedidosSimulados = [
    {
      id: 1,
      fecha: '2024-12-10',
      productos: ['Torta Chocolate Premium', 'Cupcakes Surtidos x6'],
      total: 32000,
      estado: 'Entregado',
      direccion: 'Av. Providencia 1234, Santiago'
    },
    {
      id: 2,
      fecha: '2024-12-08',
      productos: ['Cheesecake Frutos Rojos'],
      total: 18000,
      estado: 'En preparación',
      direccion: 'Las Condes 567, Santiago'
    },
    {
      id: 3,
      fecha: '2024-12-05',
      productos: ['Cookies Artesanales x12', 'Brownie Especial'],
      total: 15500,
      estado: 'Entregado',
      direccion: 'Retiro en tienda'
    }
  ];

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Entregado':
        return <Badge bg="success">Entregado</Badge>;
      case 'En preparación':
        return <Badge bg="warning">En preparación</Badge>;
      case 'En camino':
        return <Badge bg="info">En camino</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  return (
    <main style={{backgroundColor: '#FFF5E1', minHeight: '100vh', paddingTop: '3rem'}}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card style={{
              borderRadius: '20px',
              border: '3px solid #8B4513',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}>
              <Card.Header style={{
                backgroundColor: '#FFC0CB',
                borderBottom: '2px solid #8B4513',
                borderRadius: '17px 17px 0 0',
                padding: '1.5rem'
              }}>
                <h2 style={{
                  fontFamily: 'Pacifico, cursive',
                  color: '#8B4513',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Dashboard Cliente
                </h2>
                <p className="text-center mb-0" style={{color: '#666', marginTop: '0.5rem'}}>
                  Bienvenido, {user.correo}
                </p>
              </Card.Header>

              <Card.Body style={{padding: '2rem'}}>
                <Alert variant="info" style={{
                  borderRadius: '15px',
                  border: '2px solid #17a2b8',
                  marginBottom: '2rem'
                }}>
                  <h5>Tu historial de pedidos</h5>
                  <p className="mb-0">
                    Aquí puedes ver todos tus pedidos realizados en Pastelería 1000 Sabores
                  </p>
                </Alert>

                <Row>
                  {pedidosSimulados.map((pedido) => (
                    <Col md={6} lg={4} key={pedido.id} className="mb-4">
                      <Card style={{
                        border: '2px solid #8B4513',
                        borderRadius: '15px',
                        height: '100%'
                      }}>
                        <Card.Header style={{
                          backgroundColor: '#FFE4E1',
                          borderBottom: '1px solid #8B4513'
                        }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <strong>Pedido #{pedido.id}</strong>
                            {getEstadoBadge(pedido.estado)}
                          </div>
                          <small className="text-muted">{pedido.fecha}</small>
                        </Card.Header>
                        <Card.Body>
                          <h6>Productos:</h6>
                          <ul style={{paddingLeft: '1.2rem', marginBottom: '1rem'}}>
                            {pedido.productos.map((producto, index) => (
                              <li key={index} style={{fontSize: '0.9rem', marginBottom: '0.3rem'}}>
                                {producto}
                              </li>
                            ))}
                          </ul>

                          <div style={{borderTop: '1px dashed #ccc', paddingTop: '1rem'}}>
                            <div className="d-flex justify-content-between mb-2">
                              <strong>Total:</strong>
                              <strong style={{color: '#8B4513'}}>{formatPrice(pedido.total)}</strong>
                            </div>
                            <div>
                              <strong>Entrega:</strong>
                              <div style={{fontSize: '0.9rem', color: '#666'}}>
                                {pedido.direccion}
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Alert variant="success" style={{
                  borderRadius: '15px',
                  border: '2px solid #28a745',
                  marginTop: '2rem',
                  textAlign: 'center'
                }}>
                  <h6>¿Quieres hacer un nuevo pedido?</h6>
                  <p className="mb-0">
                    Explora nuestro catálogo y encuentra tu próximo postre favorito
                  </p>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ClienteDashboard;