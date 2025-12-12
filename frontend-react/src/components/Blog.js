import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Secretos para el Pastel Perfecto",
      date: "15 Diciembre 2024",
      excerpt: "Descubre los trucos que han pasado de generación en generación en nuestra familia...",
      category: "Técnicas"
    },
    {
      id: 2,
      title: "Ingredientes Locales: La Magia de Nuestra Región",
      date: "10 Diciembre 2024",
      excerpt: "Trabajamos con los mejores productores locales para traerte sabores únicos...",
      category: "Ingredientes"
    },
    {
      id: 3,
      title: "Historia de Nuestros Postres Navideños",
      date: "5 Diciembre 2024",
      excerpt: "Una tradición que comenzó hace 50 años y sigue deleitando familias...",
      category: "Historia"
    }
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
            📰 Blog Pastelería 1000 Sabores
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1.2rem',
            fontStyle: 'italic'
          }}>
            Recetas, historias y secretos de 50 años de tradición
          </p>
        </header>

        <Row>
          {blogPosts.map(post => (
            <Col md={4} key={post.id} className="mb-4">
              <article>
                <Card className="h-100 shadow-sm" style={{border: '2px solid #8B4513', borderRadius: '15px'}}>
                  <Card.Header style={{backgroundColor: '#FFC0CB', borderBottom: '2px solid #8B4513'}}>
                    <Badge bg="secondary" className="mb-2">{post.category}</Badge>
                    <Card.Title style={{color: '#8B4513', fontWeight: 'bold'}}>
                      {post.title}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text style={{color: '#555', lineHeight: '1.6'}}>
                      {post.excerpt}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer style={{backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6'}}>
                    <small style={{color: '#666'}}>📅 {post.date}</small>
                  </Card.Footer>
                </Card>
              </article>
            </Col>
          ))}
        </Row>

        <section className="mt-5 text-center">
          <Card style={{border: '2px solid #8B4513', borderRadius: '15px', backgroundColor: 'rgba(255, 192, 203, 0.3)'}}>
            <Card.Body>
              <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive'}}>
                ¡Suscríbete a nuestro blog!
              </h3>
              <p style={{color: '#666'}}>
                Recibe las últimas recetas y noticias directamente en tu correo
              </p>
              <div className="d-flex justify-content-center">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="form-control me-2"
                  style={{maxWidth: '300px', border: '2px solid #8B4513'}}
                />
                <button
                  className="btn"
                  style={{
                    backgroundColor: '#8B4513',
                    color: 'white',
                    border: '2px solid #8B4513',
                    fontWeight: 'bold'
                  }}
                >
                  📧 Suscribirse
                </button>
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </main>
  );
}

export default Blog;