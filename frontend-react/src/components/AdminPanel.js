import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Alert, Modal } from 'react-bootstrap';
import { productosService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    imagenUrl: '',
    categoria: 'POSTRES'
  });

  const { user } = useAuth();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(''); // Limpiar errores previos
      const response = await productosService.obtenerTodos();
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      // Solo mostrar error si es importante, no al inicio
      if (productos.length === 0) {
        setError('No se pueden cargar los productos en este momento');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validar datos antes de enviar
    if (!formData.codigo || !formData.nombre || !formData.precio) {
      setError('Por favor completa todos los campos requeridos');
      setLoading(false);
      return;
    }

    const productoData = {
      codigo: formData.codigo.trim(),
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: parseFloat(formData.precio),
      imagenUrl: formData.imagenUrl.trim() || null,
      categoria: formData.categoria
    };

    try {
      if (editingProduct) {
        await productosService.actualizar(editingProduct.id, productoData);
        setSuccess('Producto actualizado correctamente');
      } else {
        await productosService.crear(productoData);
        setSuccess('Producto creado correctamente');
      }

      cargarProductos();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error detallado:', error);
      if (error.response && error.response.data) {
        setError(`Error: ${error.response.data.message || 'No se pudo guardar el producto'}`);
      } else {
        setError('No se pudo realizar la petición. Verifica la conexión.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setFormData({
      codigo: producto.codigo || '',
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      imagenUrl: producto.imagenUrl || '',
      categoria: producto.categoria || 'POSTRES'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      setLoading(true);
      await productosService.eliminar(id);
      setSuccess('Producto eliminado correctamente');
      cargarProductos();
    } catch (error) {
      setError('Error al eliminar producto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      codigo: '',
      nombre: '',
      descripcion: '',
      precio: '',
      imagenUrl: '',
      categoria: 'POSTRES'
    });
    setEditingProduct(null);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Panel de Administración</h2>
          <p className="text-muted">Bienvenido, {user.correo} - Rol: {user.rol}</p>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Gestión de Productos</h5>
                <Button
                  variant="primary"
                  onClick={() => setShowModal(true)}
                  disabled={loading}
                >
                  + Agregar Producto
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(producto => (
                      <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.codigo}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.descripcion?.substring(0, 50)}...</td>
                        <td>${producto.precio?.toLocaleString()}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(producto)}
                            disabled={loading}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(producto.id)}
                            disabled={loading}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {productos.length === 0 && !loading && (
                <div className="text-center text-muted py-4">
                  No hay productos disponibles
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para agregar/editar producto */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Código *</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
                placeholder="Ej: TC001, CP001"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre del producto"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del producto"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio (CLP) *</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Ej: 25000"
                min="1"
                step="1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
              >
                <option value="TORTAS">Tortas</option>
                <option value="CUPCAKES">Cupcakes</option>
                <option value="POSTRES">Postres</option>
                <option value="GALLETAS">Galletas</option>
                <option value="PANES">Panes</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen (opcional)</Form.Label>
              <Form.Control
                type="url"
                name="imagenUrl"
                value={formData.imagenUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Crear')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminPanel;