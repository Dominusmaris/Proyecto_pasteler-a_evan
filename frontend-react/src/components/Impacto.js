import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';

function Impacto() {
  const impactData = [
    {
      icon: "",
      title: "Ingredientes Locales",
      percentage: 85,
      description: "De nuestros ingredientes provienen de productores locales en un radio de 50km",
      color: "success"
    },
    {
      icon: "",
      title: "Packaging Sustentable",
      percentage: 70,
      description: "De nuestros envases son biodegradables o reciclables",
      color: "info"
    },
    {
      icon: "",
      title: "Empleos Locales",
      percentage: 100,
      description: "De nuestro equipo son personas de la comunidad local",
      color: "warning"
    },
    {
      icon: ""
      title: "Eventos Comunitarios",
      percentage: 95,
      description: "De los eventos locales cuentan con nuestros productos donados",
      color: "danger"
    }
  ];

  const initiatives = [
    {
      title: "Programa Escuelas Dulces",
      description: "Talleres gratuitos de repostería para niños en escuelas locales",
      impact: "500+ niños beneficiados anualmente"
    },
    {
      title: "Apoyo a Productores Locales",
      description: "Compramos directamente a 15 familias productoras de la región",
      impact: "Generamos 45 empleos indirectos"
    },
    {
      title: "Cero Desperdicio",
      description: "Los productos no vendidos se donan a comedores comunitarios",
      impact: "2000+ porciones donadas mensualmente"
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
            Nuestro Impacto Social
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1.3rem',
            fontStyle: 'italic',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Comprometidos con nuestra comunidad y el medio ambiente desde hace 50 años
          </p>
        </header>

        <section className="mb-5">
          <h2 style={{
            color: '#8B4513',
            fontFamily: 'Pacifico, cursive',
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem'
          }}>
            Nuestros Números
          </h2>

          <Row>
            {impactData.map((item, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card
                  className="h-100 text-center"
                  style={{
                    border: '2px solid #8B4513',
                    borderRadius: '15px',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Card.Header style={{
                    backgroundColor: '#FFC0CB',
                    borderBottom: '2px solid #8B4513',
                    fontSize: '3rem'
                  }}>
                    {item.icon}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{color: '#8B4513', fontWeight: 'bold'}}>
                      {item.title}
                    </Card.Title>
                    <div className="mb-3">
                      <h3 style={{color: '#8B4513', fontSize: '2.5rem', fontWeight: 'bold'}}>
                        {item.percentage}%
                      </h3>
                      <ProgressBar
                        variant={item.color}
                        now={item.percentage}
                        style={{height: '10px'}}
                      />
                    </div>
                    <Card.Text style={{color: '#555', fontSize: '0.9rem'}}>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-5">
          <h2 style={{
            color: '#8B4513',
            fontFamily: 'Pacifico, cursive',
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem'
          }}>
            Nuestras Iniciativas
          </h2>

          <Row>
            {initiatives.map((initiative, index) => (
              <Col lg={4} key={index} className="mb-4">
                <article>
                  <Card
                    className="h-100"
                    style={{
                      border: '2px solid #8B4513',
                      borderRadius: '15px'
                    }}
                  >
                    <Card.Header style={{
                      backgroundColor: index % 2 === 0 ? '#FFC0CB' : '#FFE4E1',
                      borderBottom: '2px solid #8B4513'
                    }}>
                      <Card.Title style={{color: '#8B4513', fontWeight: 'bold', margin: 0}}>
                        {initiative.title}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text style={{color: '#555', lineHeight: '1.6', marginBottom: '1rem'}}>
                        {initiative.description}
                      </Card.Text>
                      <Badge
                        bg="success"
                        style={{
                          fontSize: '0.9rem',
                          padding: '8px 12px'
                        }}
                      >
                        ✅ {initiative.impact}
                      </Badge>
                    </Card.Body>
                  </Card>
                </article>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-5">
          <Row>
            <Col lg={6} className="mb-4">
              <Card style={{border: '2px solid #8B4513', borderRadius: '15px', height: '100%'}}>
                <Card.Header style={{backgroundColor: '#FFC0CB', borderBottom: '2px solid #8B4513'}}>
                  <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                    Compromiso Ambiental
                  </h3>
                </Card.Header>
                <Card.Body>
                  <ul style={{color: '#555', fontSize: '1.1rem', lineHeight: '1.8'}}>
                    <li><strong>Energía renovable:</strong> 60% de nuestra energía proviene de paneles solares</li>
                    <li><strong>Agua:</strong> Sistema de reutilización reduce el consumo en 40%</li>
                    <li><strong>Residuos:</strong> 90% de nuestros residuos se reciclan o compostan</li>
                    <li><strong>Transporte:</strong> Entregas en bicicleta en radio de 5km</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} className="mb-4">
              <Card style={{border: '2px solid #8B4513', borderRadius: '15px', height: '100%'}}>
                <Card.Header style={{backgroundColor: '#FFE4E1', borderBottom: '2px solid #8B4513'}}>
                  <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive', margin: 0}}>
                    Metas 2025
                  </h3>
                </Card.Header>
                <Card.Body>
                  <ul style={{color: '#555', fontSize: '1.1rem', lineHeight: '1.8'}}>
                    <li><strong>100% ingredientes locales</strong> en productos básicos</li>
                    <li><strong>Carbon neutral</strong> en todas nuestras operaciones</li>
                    <li><strong>1000 talleres</strong> gratuitos para la comunidad</li>
                    <li><strong>50 empleos directos</strong> para familias locales</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <footer className="text-center">
          <Card style={{
            border: '2px solid #8B4513',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 192, 203, 0.3)'
          }}>
            <Card.Body>
              <h3 style={{color: '#8B4513', fontFamily: 'Pacifico, cursive'}}>
                🌟 Juntos construimos un futuro más dulce
              </h3>
              <p style={{color: '#666', fontSize: '1.1rem'}}>
                Cada pastel que comprás contribuye a nuestra misión de crear impacto positivo
              </p>
              <Badge bg="success" style={{fontSize: '1rem', padding: '10px 20px'}}>
                💚 ¡Gracias por ser parte del cambio!
              </Badge>
            </Card.Body>
          </Card>
        </footer>
      </Container>
    </main>
  );
}

export default Impacto;