import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Impacto() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}>
            Nuestro Impacto
          </h1>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Compromiso con la comunidad</Card.Title>
              <Card.Text>
                Trabajamos con ingredientes locales y apoyamos a productores
                de la región. Nuestro compromiso es crear no solo sabores
                únicos, sino también un impacto positivo en nuestra comunidad.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Impacto;