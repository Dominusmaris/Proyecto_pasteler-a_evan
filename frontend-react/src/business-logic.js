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

// Función para validar contraseña
function validatePassword(password) {
  if (!password) return { isValid: false, message: 'La contraseña es requerida' };
  if (password.length < 6) return { isValid: false, message: 'Mínimo 6 caracteres' };
  if (password.length > 50) return { isValid: false, message: 'Máximo 50 caracteres' };
  return { isValid: true, message: 'Contraseña válida' };
}

// Función para calcular fortaleza de contraseña
function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 25;
  return strength;
}

// Función para formatear fecha
function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Función para calcular descuento
function calculateDiscount(subtotal, discountPercent) {
  if (!discountPercent || discountPercent <= 0) return 0;
  return Math.round((subtotal * discountPercent) / 100);
}

// Función para validar teléfono chileno
function isValidChileanPhone(phone) {
  const phoneRegex = /^(\+?56|0)?[1-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

// Función para formatear teléfono chileno
function formatChileanPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `+56 9 ${cleaned.slice(1, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

// Función para validar nombre
function validateName(name) {
  if (!name || !name.trim()) return false;
  if (name.trim().length < 2) return false;
  if (name.trim().length > 100) return false;
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim());
}