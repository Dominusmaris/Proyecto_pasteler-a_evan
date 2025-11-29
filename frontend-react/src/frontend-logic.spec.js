describe('Frontend Logic Testing - Jasmine & Karma', function() {

  describe('Formateo de precios chilenos', function() {
    it('debería formatear 45000 como $45.000', function() {
      expect(clp(45000)).toBe('$45.000');
    });

    it('debería formatear 5500 como $5.500', function() {
      expect(clp(5500)).toBe('$5.500');
    });

    it('debería formatear 0 como $0', function() {
      expect(clp(0)).toBe('$0');
    });
  });

  describe('Etiquetas de personas por tamaño', function() {
    it('debería retornar "Pequeña (10 personas)" para tamaño S', function() {
      expect(personasLabel('S')).toBe('Pequeña (10 personas)');
    });

    it('debería retornar "Mediana (20 personas)" para tamaño M', function() {
      expect(personasLabel('M')).toBe('Mediana (20 personas)');
    });

    it('debería retornar "Grande (30 personas)" para tamaño L', function() {
      expect(personasLabel('L')).toBe('Grande (30 personas)');
    });

    it('debería retornar cadena vacía para valor nulo', function() {
      expect(personasLabel(null)).toBe('');
    });
  });

  describe('Cálculo de total del carrito', function() {
    it('debería calcular total correctamente con múltiples items', function() {
      const cartItems = [
        { precio: 45000, qty: 2 },
        { precio: 5000, qty: 1 }
      ];
      expect(calculateCartTotal(cartItems)).toBe(95000);
    });

    it('debería retornar 0 para carrito vacío', function() {
      expect(calculateCartTotal([])).toBe(0);
    });
  });

  describe('Generación de keys únicos', function() {
    it('debería generar key único correctamente', function() {
      const item = {
        codigo: 'TC001',
        size: 'M',
        note: 'Feliz cumpleaños'
      };
      expect(generateItemKey(item)).toBe('TC001-M-Feliz cumpleaños');
    });
  });

  describe('Validación de email', function() {
    it('debería validar emails correctos', function() {
      expect(isValidEmail('test@gmail.com')).toBe(true);
      expect(isValidEmail('usuario@dominio.cl')).toBe(true);
    });

    it('debería rechazar emails incorrectos', function() {
      expect(isValidEmail('email-invalido')).toBe(false);
      expect(isValidEmail('@dominio.com')).toBe(false);
    });
  });
});