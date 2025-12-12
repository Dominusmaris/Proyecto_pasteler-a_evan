import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Productos from './components/Productos';
import Blog from './components/Blog';
import Origen from './components/Origen';
import Impacto from './components/Impacto';
import Pedido from './components/Pedido';
import Footer from './components/Footer';
import './App.css';
import './styles/CustomStyles.css';

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Inicialización del carrito desde localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pms_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Persistencia del carrito en localStorage
  useEffect(() => {
    localStorage.setItem('pms_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (newItem) => {
    setCartItems(prev => {
      const key = `${newItem.codigo}-${newItem.size || ''}-${newItem.note || ''}`;
      const existingIndex = prev.findIndex(item =>
        `${item.codigo}-${item.size || ''}-${item.note || ''}` === key
      );

      if (existingIndex >= 0) {
        // Incrementar cantidad si el item existe
        const updated = [...prev];
        updated[existingIndex].qty += newItem.qty;
        return updated;
      } else {
        // Agregar nuevo item al carrito
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(1, newQty);
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="App" style={{backgroundColor: '#FFF5E1', minHeight: '100vh'}}>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setShowCart(true)}
      />

      <Routes>
        {/* Página principal */}
        <Route
          path="/"
          element={
            <ProductGrid onAddToCart={handleAddToCart} />
          }
        />

        {/* Páginas del navbar */}
        <Route
          path="/productos"
          element={
            <Productos onAddToCart={handleAddToCart} />
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/origen" element={<Origen />} />
        <Route path="/impacto" element={<Impacto />} />
        <Route path="/pedido" element={<Pedido />} />

        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Panel de admin (protegido) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Cart modal - siempre disponible */}
      <Cart
        show={showCart}
        onHide={() => setShowCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Componente principal con router y context
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
