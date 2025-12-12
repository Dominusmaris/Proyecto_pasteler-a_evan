import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductGrid from './ProductGrid';

function Productos({ onAddToCart }) {
  return (
    <Container fluid className="py-4" style={{backgroundColor: '#FFF5E1', minHeight: '100vh'}}>
      <Row>
        <Col>
          <div className="text-center mb-4">
            <h1 style={{
              color: '#8B4513',
              fontFamily: 'Pacifico, cursive',
              fontSize: '3rem',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              🧁 Nuestros Productos 🧁
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1.2rem',
              fontStyle: 'italic'
            }}>
              Descubre nuestros deliciosos pasteles y postres artesanales
            </p>
          </div>
          <ProductGrid onAddToCart={onAddToCart} />
        </Col>
      </Row>
    </Container>
  );
}

export default Productos;