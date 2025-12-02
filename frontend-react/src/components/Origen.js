import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Origen() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
            Nuestro Origen
          </h1>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>50 años de tradición</Card.Title>
              <Card.Text>
                Desde 1973, Pastelería 1000 Sabores ha sido el corazón dulce
                de nuestra comunidad, transmitiendo recetas familiares de
                generación en generación.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Origen;