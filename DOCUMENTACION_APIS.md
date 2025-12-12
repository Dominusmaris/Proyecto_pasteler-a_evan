# 📚 Documentación de APIs - Pastelería 1000 Sabores

## 🌐 Información General

**Base URL:** `https://pasteleria-backend-dlry.onrender.com/api`
**Versión:** 1.0
**Protocolo:** HTTPS
**Formato de respuesta:** JSON
**Autenticación:** JWT (Bearer Token)

---

## 🔐 Autenticación

### Registro de Usuario
**Endpoint:** `POST /auth/register`

```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@email.com",
  "contraseña": "password123",
  "rol": "CLIENTE"
}
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@email.com",
  "rol": "CLIENTE",
  "fechaCreacion": "2024-12-11T15:30:00"
}
```

### Inicio de Sesión
**Endpoint:** `POST /auth/login`

```json
{
  "correo": "juan@email.com",
  "contraseña": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@email.com",
    "rol": "CLIENTE"
  }
}
```

---

## 🧁 Gestión de Productos

### Listar Todos los Productos
**Endpoint:** `GET /productos`
**Autenticación:** No requerida

**Respuesta:**
```json
[
  {
    "id": 1,
    "codigo": "TC001",
    "nombre": "Torta Chocolate Premium",
    "descripcion": "Deliciosa torta de chocolate con cobertura de ganache",
    "precio": 25000,
    "imagenUrl": "https://ejemplo.com/imagen.jpg",
    "categoria": "TORTAS",
    "disponible": true,
    "fechaCreacion": "2024-12-11T10:00:00"
  }
]
```

### Obtener Producto por ID
**Endpoint:** `GET /productos/{id}`
**Autenticación:** No requerida

**Respuesta:**
```json
{
  "id": 1,
  "codigo": "TC001",
  "nombre": "Torta Chocolate Premium",
  "descripcion": "Deliciosa torta de chocolate con cobertura de ganache",
  "precio": 25000,
  "imagenUrl": "https://ejemplo.com/imagen.jpg",
  "categoria": "TORTAS",
  "disponible": true,
  "fechaCreacion": "2024-12-11T10:00:00"
}
```

### Crear Producto (Solo Admin)
**Endpoint:** `POST /productos`
**Autenticación:** Bearer Token (Admin)

```json
{
  "codigo": "CP002",
  "nombre": "Cupcake Vainilla",
  "descripcion": "Suave cupcake de vainilla con frosting",
  "precio": 3500,
  "imagenUrl": "https://ejemplo.com/cupcake.jpg",
  "categoria": "CUPCAKES"
}
```

### Actualizar Producto (Solo Admin)
**Endpoint:** `PUT /productos/{id}`
**Autenticación:** Bearer Token (Admin)

```json
{
  "nombre": "Cupcake Vainilla Premium",
  "descripcion": "Suave cupcake de vainilla premium con frosting especial",
  "precio": 4000,
  "disponible": true
}
```

### Eliminar Producto (Solo Admin)
**Endpoint:** `DELETE /productos/{id}`
**Autenticación:** Bearer Token (Admin)

**Respuesta exitosa:**
```json
{
  "mensaje": "Producto eliminado exitosamente",
  "id": 1
}
```

---

## 📝 Códigos de Respuesta HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o ausente |
| 403 | Forbidden - Sin permisos suficientes |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: email ya existe) |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Autenticación JWT

### Incluir Token en Requests
```javascript
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'Content-Type': 'application/json'
}
```

### Estructura del Token JWT
```json
{
  "sub": "juan@email.com",
  "rol": "CLIENTE",
  "iat": 1702308600,
  "exp": 1702395000
}
```

---

## 🚨 Manejo de Errores

### Formato de Error Estándar
```json
{
  "timestamp": "2024-12-11T15:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "El correo ya está registrado",
  "path": "/api/auth/register"
}
```

### Errores Comunes

#### Error 400 - Validación
```json
{
  "timestamp": "2024-12-11T15:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Error en la validación de datos",
  "errors": [
    {
      "field": "nombre",
      "message": "El nombre es obligatorio"
    },
    {
      "field": "precio",
      "message": "El precio debe ser positivo"
    }
  ]
}
```

#### Error 401 - Token Inválido
```json
{
  "timestamp": "2024-12-11T15:30:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Token JWT inválido o expirado"
}
```

---

## 📱 Ejemplos de Uso

### JavaScript/Axios
```javascript
// Configuración del cliente API
const api = axios.create({
  baseURL: 'https://pasteleria-backend-dlry.onrender.com/api',
});

// Interceptor para token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ejemplo: Listar productos
const listarProductos = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

// Ejemplo: Login
const login = async (correo, contraseña) => {
  try {
    const response = await api.post('/auth/login', {
      correo,
      contraseña
    });

    const { token, usuario } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));

    return response.data;
  } catch (error) {
    console.error('Error de login:', error.response.data);
  }
};
```

### cURL
```bash
# Listar productos
curl -X GET \
  https://pasteleria-backend-dlry.onrender.com/api/productos \
  -H 'Content-Type: application/json'

# Login
curl -X POST \
  https://pasteleria-backend-dlry.onrender.com/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "correo": "juan@email.com",
    "contraseña": "password123"
  }'

# Crear producto (requiere token admin)
curl -X POST \
  https://pasteleria-backend-dlry.onrender.com/api/productos \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN_HERE' \
  -d '{
    "codigo": "CP003",
    "nombre": "Brownie Especial",
    "descripcion": "Brownie con nueces y chocolate blanco",
    "precio": 4500,
    "categoria": "POSTRES"
  }'
```

---

## 🔄 Paginación y Filtros

### Parámetros de Query (Próxima implementación)
```
GET /productos?page=0&size=10&sort=nombre,asc&categoria=TORTAS
```

### Respuesta Paginada
```json
{
  "content": [...],
  "pageable": {
    "sort": { "sorted": true },
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 25,
  "totalPages": 3,
  "first": true,
  "last": false
}
```

---

## 📊 Rate Limiting

**Límites actuales:**
- Requests por minuto: 100
- Requests por hora: 1000
- Requests por día: 10000

**Headers de respuesta:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1702308660
```

---

## 🌍 CORS

**Dominios permitidos:**
- `https://pasteleria-1000-sabores.vercel.app`
- `http://localhost:3000` (desarrollo)

**Headers permitidos:**
- `Authorization`
- `Content-Type`
- `X-Requested-With`

---

## 📈 Monitoreo y Logs

### Health Check
**Endpoint:** `GET /health`

```json
{
  "status": "UP",
  "timestamp": "2024-12-11T15:30:00",
  "version": "1.0.0",
  "environment": "production"
}
```

### Métricas
**Endpoint:** `GET /actuator/metrics` (Solo Admin)

---

## 🛡️ Seguridad

### Buenas Prácticas Implementadas
- ✅ Autenticación JWT con expiración
- ✅ Validación de entrada en todos los endpoints
- ✅ Hash de contraseñas con BCrypt
- ✅ Headers de seguridad (CORS, CSRF)
- ✅ Rate limiting
- ✅ Logs de auditoría

### Headers de Seguridad
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

---

## 📞 Soporte

**Contacto Técnico:**
📧 dev@pasteleria1000sabores.com
📱 +56 9 8765 4321

**Documentación Swagger:**
🌐 https://pasteleria-backend-dlry.onrender.com/swagger-ui.html

**Estado del Servicio:**
📊 https://status.pasteleria1000sabores.com

---

*Documentación actualizada: Diciembre 2024*
*Versión: 1.0*