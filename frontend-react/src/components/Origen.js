import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Origen() {
  const timeline = [
    {
      year: "1974",
      title: "Los Primeros Pasos",
      description: "Abuela María abre su pequeño local con solo 3 recetas familiares y mucho amor."
    },
    {
      year: "1985",
      title: "Expansión del Negocio",
      description: "Se incorporan nuevas recetas y el negocio crece gracias al boca a boca de los clientes."
    },
    {
      year: "1995",
      title: "Segunda Generación",
      description: "Los hijos de María toman las riendas, manteniendo las tradiciones pero innovando."
    },
    {
      year: "2010",
      title: "Era Digital",
      description: "Nos adaptamos a los nuevos tiempos sin perder nuestra esencia artesanal."
    },
    {
      year: "2024",
      title: "50 Años de Dulzura",
      description: "Celebramos medio siglo endulzando vidas y creando memorias familiares."
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
            🏠 Nuestro Origen
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1.3rem',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            La historia de una familia que convirtió su pasión por la repostería
            en 50 años de tradición y sabor
          </p>
        </header>

        <Row className="mb-5">
          <Col lg={6}>
            <Card style={{border: '2px solid #8B4513', borderRadius: '15px', height: '100%'}}>
              <Card.Header style={{backgroundColor: '#FFC0CB', borderBottom: '2px solid #8B4513'}}>
                <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                  👵 Abuela María
                </h3>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{color: '#555', fontSize: '1.1rem', lineHeight: '1.7'}}>
                  Todo comenzó en 1974 cuando la abuela María decidió compartir sus recetas
                  secretas con el mundo. Con solo una pequeña cocina y tres recetas heredadas
                  de su madre, abrió las puertas de lo que hoy conocemos como
                  <strong> Pastelería 1000 Sabores</strong>.
                </Card.Text>
                <Card.Text style={{color: '#555', fontSize: '1.1rem', lineHeight: '1.7'}}>
                  Su filosofía era simple: <em>"Cada pastel debe llevar amor, porque la gente
                  no solo come sabor, come recuerdos"</em>.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card style={{border: '2px solid #8B4513', borderRadius: '15px', height: '100%'}}>
              <Card.Header style={{backgroundColor: '#FFC0CB', borderBottom: '2px solid #8B4513'}}>
                <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                  🎯 Nuestra Misión
                </h3>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{color: '#555', fontSize: '1.1rem', lineHeight: '1.7'}}>
                  Crear momentos dulces y memorias duraderas en cada familia que prueba
                  nuestros productos. Mantenemos vivas las recetas tradicionales mientras
                  innovamos con ingredientes locales de la mejor calidad.
                </Card.Text>
                <Card.Text style={{color: '#555', fontSize: '1.1rem', lineHeight: '1.7'}}>
                  <strong>Nuestros valores:</strong> Tradición, Calidad, Familia y Comunidad.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <section className="mb-5">
          <h2 style={{
            color: '#8B4513',
            fontFamily: 'Pacifico, cursive',
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem'
          }}>
            📅 Nuestra Historia
          </h2>

          <Row>
            {timeline.map((item, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <article>
                  <Card
                    className="h-100 shadow-sm timeline-card"
                    style={{
                      border: '2px solid #8B4513',
                      borderRadius: '15px',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <Card.Header style={{
                      backgroundColor: index % 2 === 0 ? '#FFC0CB' : '#FFE4E1',
                      borderBottom: '2px solid #8B4513',
                      textAlign: 'center'
                    }}>
                      <h4 style={{
                        color: '#8B4513',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        margin: 0
                      }}>
                        {item.year}
                      </h4>
                    </Card.Header>
                    <Card.Body className="text-center">
                      <Card.Title style={{color: '#8B4513', fontWeight: 'bold'}}>
                        {item.title}
                      </Card.Title>
                      <Card.Text style={{color: '#555', lineHeight: '1.6'}}>
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </article>
              </Col>
            ))}
          </Row>
        </section>

        <footer className="text-center mt-5">
          <Card style={{
            border: '2px solid #8B4513',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 192, 203, 0.3)'
          }}>
            <Card.Body>
              <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive'}}>
                💝 Gracias por ser parte de nuestra historia
              </h3>
              <p style={{color: '#666', fontSize: '1.1rem'}}>
                50 años después, seguimos horneando con el mismo amor y dedicación de siempre
              </p>
            </Card.Body>
          </Card>
        </footer>
      </Container>
    </main>
  );
}

export default Origen;