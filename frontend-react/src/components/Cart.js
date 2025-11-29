import React from 'react';
import { Offcanvas, Button, ListGroup, Row, Col } from 'react-bootstrap';

// Formateo de precios en pesos chilenos
function clp(n) {
  const r = Math.round(n/500)*500;
  return r.toLocaleString('es-CL',{style:'currency',currency:'CLP'});
}

function personasLabel(size) {
  if (!size) return '';
  return size === 'S' ? 'Pequeña (10 personas)' :
         size === 'M' ? 'Mediana (20 personas)' :
         size === 'L' ? 'Grande (30 personas)' : size;
}

function Cart({ show, onHide, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const total = cartItems.reduce((sum, item) => sum + (item.precio * item.qty), 0);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" style={{width: '420px'}}>
      <Offcanvas.Header closeButton style={{borderBottom: '3px solid #f0e4dc'}}>
        <Offcanvas.Title>Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        {cartItems.length === 0 ? (
          <div className="text-muted text-center my-4">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            <div className="flex-grow-1" style={{overflowY: 'auto'}}>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={`${item.codigo}-${item.size}-${item.note}`} className="px-0">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img
                          src={item.img}
                          alt={item.nombre}
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: '2px solid #f0e4dc'
                          }}
                        />
                      </Col>
                      <Col xs={6}>
                        <div style={{fontWeight: '900', fontSize: '14px'}}>
                          {item.nombre}
                        </div>
                        <div className="text-muted" style={{fontSize: '12px'}}>
                          {item.size && `Tamaño: ${personasLabel(item.size)} · `}
                          {item.note && `Mensaje: "${item.note}" · `}
                          Código: {item.codigo}
                        </div>
                      </Col>
                      <Col xs={3} className="text-end">
                        <div className="d-flex align-items-center justify-content-end gap-1 mb-1">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            style={{padding: '2px 8px'}}
                            onClick={() => onUpdateQuantity(index, Math.max(1, item.qty - 1))}
                          >
                            −
                          </Button>
                          <span style={{minWidth: '20px', textAlign: 'center'}}>
                            {item.qty}
                          </span>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            style={{padding: '2px 8px'}}
                            onClick={() => onUpdateQuantity(index, item.qty + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          style={{padding: '2px 6px', fontSize: '12px'}}
                          onClick={() => onRemoveItem(index)}
                          title="Eliminar"
                        >
                          🗑
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-end text-muted" style={{fontSize: '14px', marginTop: '4px'}}>
                        {clp(item.precio * item.qty)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            <div style={{borderTop: '2px dashed #f1d2d8', paddingTop: '16px', marginTop: '16px'}}>
              <Row className="justify-content-between align-items-center mb-3">
                <Col>
                  <strong>Total: {clp(total)}</strong>
                </Col>
              </Row>
              <Row className="gap-2">
                <Col>
                  <Button
                    variant="outline-secondary"
                    className="w-100"
                    onClick={onClearCart}
                  >
                    Vaciar
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      background: '#8B4513',
                      border: 'none',
                      borderRadius: '14px',
                      fontWeight: '800'
                    }}
                    className="w-100"
                  >
                    Continuar al pago
                  </Button>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;