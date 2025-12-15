import React from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Header({ cartCount, onCartOpen }) {
  const { user, logout, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <Navbar expand="lg" style={{
      backgroundColor: 'rgba(255,255,255,0.7)',
      backdropFilter: 'saturate(1.2) blur(6px)',
      borderBottom: '3px solid #ffdbe2',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: '28px',
            color: '#8B4513',
            letterSpacing: '.5px',
            textDecoration: 'none'
          }}
        >
          Pastelería 1000 Sabores
          <span style={{
            background: '#FFC0CB',
            color: '#8B4513',
            border: '2px solid #8B4513',
            borderRadius: '999px',
            padding: '2px 10px',
            fontWeight: '800',
            fontSize: '12px',
            marginLeft: '8px'
          }}>
            50 años
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/productos" style={{fontWeight: '700'}}>Productos</Nav.Link>
            <Nav.Link as={Link} to="/blog" style={{fontWeight: '700'}}>Blog</Nav.Link>
            <Nav.Link as={Link} to="/origen" style={{fontWeight: '700'}}>Origen</Nav.Link>
            <Nav.Link as={Link} to="/impacto" style={{fontWeight: '700'}}>Impacto</Nav.Link>
            <Nav.Link as={Link} to="/pedido" style={{fontWeight: '700'}}>Pedido</Nav.Link>
            <Nav.Link as={Link} to="/register" style={{fontWeight: '700'}}>Registro</Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              onClick={() => navigate('/productos')}
              style={{
                background: '#FFC0CB',
                color: '#8B4513',
                border: '2px solid #8B4513',
                borderRadius: '14px',
                fontWeight: '800'
              }}
            >
              Ver Catálogo
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onCartOpen}
              style={{
                background: 'transparent',
                border: '2px solid #8B4513',
                color: '#8B4513',
                borderRadius: '14px',
                fontWeight: '800'
              }}
            >
              Carrito{' '}
              <Badge bg="secondary" style={{marginLeft: '6px'}}>
                {cartCount || 0}
              </Badge>
            </Button>

            {isLoggedIn() ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  style={{
                    background: isAdmin() ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' : '#28a745',
                    border: `2px solid ${isAdmin() ? '#ff6b6b' : '#28a745'}`,
                    borderRadius: '14px',
                    fontWeight: '800',
                    boxShadow: isAdmin() ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  {isAdmin() && <span style={{marginRight: '8px'}}>★</span>}
                  {user.correo}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    Rol: {user.rol}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {isAdmin() ? (
                    <>
                      <Dropdown.Item onClick={() => navigate('/admin')}>
                        Panel Admin
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/productos')}>
                        Gestionar Productos
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item onClick={() => navigate('/productos')}>
                        Ver Catálogo
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/dashboard')}>
                        Mi Dashboard
                      </Dropdown.Item>
                    </>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-1">
                <Button
                  variant="outline-info"
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'transparent',
                    border: '2px solid #17a2b8',
                    color: '#17a2b8',
                    borderRadius: '14px',
                    fontWeight: '800'
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => navigate('/register')}
                  style={{
                    background: 'transparent',
                    border: '2px solid #28a745',
                    color: '#28a745',
                    borderRadius: '14px',
                    fontWeight: '800'
                  }}
                >
                  Registro
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;