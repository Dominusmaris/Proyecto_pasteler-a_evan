// Función de formateo de precios en pesos chilenos
function clp(n) {
  const r = Math.round(n/500)*500;
  return r.toLocaleString('es-CL',{style:'currency',currency:'CLP'});
}

// Función para etiquetas de tamaño de tortas
function personasLabel(size) {
  if (!size) return '';
  return size === 'S' ? 'Pequeña (10 personas)' :
         size === 'M' ? 'Mediana (20 personas)' :
         size === 'L' ? 'Grande (30 personas)' : size;
}

// Función para calcular total del carrito
function calculateCartTotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + (item.precio * item.qty), 0);
}

// Función para generar key único de item
function generateItemKey(item) {
  return `${item.codigo}-${item.size || ''}-${item.note || ''}`;
}

// Función para validar email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}