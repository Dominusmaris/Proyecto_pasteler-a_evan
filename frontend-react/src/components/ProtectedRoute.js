import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no está logueado, redirigir a login
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere admin y no es admin, mostrar acceso denegado
  if (adminOnly && !isAdmin()) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger text-center">
              <h4>🚫 Acceso Denegado</h4>
              <p>No tienes permisos para acceder a esta sección.</p>
              <p>Solo los administradores pueden ver esta página.</p>
              <button
                className="btn btn-primary"
                onClick={() => window.history.back()}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si pasa todas las validaciones, mostrar el contenido
  return children;
};

export default ProtectedRoute;