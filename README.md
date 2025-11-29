# 🍰 Proyecto FullStack II - Pastelería

**DSY1104 - Desarrollo FullStack II**
**Evaluación Parcial N°3**

## 📋 Descripción
Sistema completo de pastelería con gestión de productos, autenticación JWT y panel administrativo.

## 🏗️ Arquitectura
- **Frontend**: React 19.2.0 + Bootstrap
- **Backend**: Spring Boot 3.5.7 + Java 17
- **Base de Datos**: H2 (desarrollo)
- **Testing**: Karma + Jasmine
- **Seguridad**: JWT + Spring Security

## 🚀 Ejecución Local

### Backend
```bash
cd backend_pasteleria
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend
```bash
cd frontend-react
npm install
npm start
```

## 🌐 URLs de Desarrollo
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8082/api
- **H2 Console**: http://localhost:8082/pasteleria-console

## 🧪 Testing
```bash
cd frontend-react
open SpecRunner.html  # Tests Jasmine/Karma
```

## 📁 Estructura del Proyecto
```
proyecto_fullstackII/
├── backend_pasteleria/     # Spring Boot API
├── frontend-react/         # React SPA
└── README.md
```

## 🔑 Funcionalidades
- ✅ Registro y autenticación de usuarios
- ✅ Gestión CRUD de productos (Admin)
- ✅ Carrito de compras
- ✅ Rutas protegidas por rol
- ✅ Persistencia de sesión
- ✅ Testing con cobertura

---
**Autor**: [Tu nombre]
**Fecha**: Noviembre 2025