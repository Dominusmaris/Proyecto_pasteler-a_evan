import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Pedido() {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
            Realizar Pedido
          </h1>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>¿Listo para disfrutar?</Card.Title>
              <Card.Text>
                Explora nuestros deliciosos productos y agrega tus favoritos
                al carrito para realizar tu pedido.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate('/')}
                style={{
                  background: '#FFC0CB',
                  color: '#8B4513',
                  border: '2px solid #8B4513',
                  borderRadius: '14px',
                  fontWeight: '800'
                }}
              >
                🧁 Ver Productos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Pedido;