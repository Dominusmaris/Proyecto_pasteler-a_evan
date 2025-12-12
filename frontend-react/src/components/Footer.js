import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-pasteleria">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 style={{
              fontFamily: 'Pacifico, cursive',
              color: '#FFC0CB',
              marginBottom: '1.5rem'
            }}>
              🧁 Pastelería 1000 Sabores
            </h5>
            <p style={{lineHeight: '1.8', color: 'rgba(255,255,255,0.9)'}}>
              50 años endulzando vidas y creando memorias familiares.
              Somos más que una pastelería, somos parte de tu historia.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Badge bg="light" text="dark" style={{padding: '8px 12px'}}>
                ⭐ 4.9/5 estrellas
              </Badge>
              <Badge bg="success" style={{padding: '8px 12px'}}>
                ✅ Certificado HACCP
              </Badge>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 style={{color: '#FFC0CB', fontWeight: 'bold', marginBottom: '1rem'}}>
              🏪 Tienda
            </h6>
            <ul style={{listStyle: 'none', padding: 0, lineHeight: '2'}}>
              <li><a href="/productos" style={{color: 'rgba(255,255,255,0.8)', textDecoration: 'none'}}>Productos</a></li>
              <li><a href="/pedido" style={{color: 'rgba(255,255,255,0.8)', textDecoration: 'none'}}>Realizar Pedido</a></li>
              <li><a href="/origen" style={{color: 'rgba(255,255,255,0.8)', textDecoration: 'none'}}>Nuestra Historia</a></li>
              <li><a href="/blog" style={{color: 'rgba(255,255,255,0.8)', textDecoration: 'none'}}>Blog</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 style={{color: '#FFC0CB', fontWeight: 'bold', marginBottom: '1rem'}}>
              📞 Contacto
            </h6>
            <div style={{lineHeight: '2', color: 'rgba(255,255,255,0.9)'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>📍 Dirección:</strong><br/>
                Av. Providencia 1234<br/>
                Santiago, Chile
              </div>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>📞 Teléfono:</strong><br/>
                +56 9 8765 4321
              </div>
              <div>
                <strong>📧 Email:</strong><br/>
                hola@pasteleria1000sabores.com
              </div>
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 style={{color: '#FFC0CB', fontWeight: 'bold', marginBottom: '1rem'}}>
              ⏰ Horarios
            </h6>
            <div style={{lineHeight: '2', color: 'rgba(255,255,255,0.9)'}}>
              <div><strong>Lun - Vie:</strong> 08:00 - 20:00</div>
              <div><strong>Sábados:</strong> 09:00 - 18:00</div>
              <div><strong>Domingos:</strong> 10:00 - 16:00</div>
              <div style={{marginTop: '1rem'}}>
                <Badge bg="warning" text="dark" style={{padding: '6px 10px'}}>
                  🎂 Pedidos especiales: 24h anticipación
                </Badge>
              </div>
            </div>
          </Col>
        </Row>

        <hr style={{
          border: '1px solid rgba(255,192,203,0.3)',
          margin: '2rem 0 1rem 0'
        }}/>

        <Row>
          <Col lg={6} className="mb-3">
            <div style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)'}}>
              <p style={{margin: 0}}>
                © {currentYear} Pastelería 1000 Sabores. Todos los derechos reservados.
              </p>
              <p style={{margin: '0.5rem 0 0 0'}}>
                Desarrollado con ❤️ para la comunidad |
                <a href="/privacy" style={{color: '#FFC0CB', marginLeft: '8px'}}>Política de Privacidad</a> |
                <a href="/terms" style={{color: '#FFC0CB', marginLeft: '8px'}}>Términos y Condiciones</a>
              </p>
            </div>
          </Col>

          <Col lg={6} className="text-end">
            <div style={{fontSize: '0.9rem'}}>
              <div style={{color: '#FFC0CB', marginBottom: '0.5rem'}}>
                🌟 Síguenos en redes sociales
              </div>
              <div className="d-flex justify-content-end gap-3">
                <a href="#" style={{color: 'white', fontSize: '1.5rem', textDecoration: 'none'}}>📘</a>
                <a href="#" style={{color: 'white', fontSize: '1.5rem', textDecoration: 'none'}}>📷</a>
                <a href="#" style={{color: 'white', fontSize: '1.5rem', textDecoration: 'none'}}>🐦</a>
                <a href="#" style={{color: 'white', fontSize: '1.5rem', textDecoration: 'none'}}>💬</a>
              </div>
            </div>
          </Col>
        </Row>

        <div className="text-center" style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,192,203,0.2)'}}>
          <small style={{color: 'rgba(255,255,255,0.6)'}}>
            Hecho con tecnologías modernas: React ⚛️ | Spring Boot 🍃 | Bootstrap 🎨
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;