import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Blog() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
            Blog de Pastelería
          </h1>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Próximamente</Card.Title>
              <Card.Text>
                Estamos trabajando en contenido increíble sobre recetas,
                técnicas de pastelería y novedades. ¡Vuelve pronto!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Blog;