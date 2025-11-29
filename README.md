# Proyecto Pastelería - FullStack II

Evaluación N°3 para DSY1104

## Descripción

Sistema web de pastelería donde los usuarios pueden ver productos y los admins pueden gestionarlos. Hecho con React y Spring Boot.

## Tecnologías usadas

- Frontend: React con Bootstrap
- Backend: Spring Boot con Java 17
- Base de datos: H2
- Testing: Karma y Jasmine

## Como ejecutar

**Backend:**
```
cd backend_pasteleria
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

**Frontend:**
```
cd frontend-react
npm start
```

Después ir a http://localhost:3000

## Lo que hace

- Los usuarios se pueden registrar y hacer login
- Hay un carrito de compras básico
- Los admins pueden agregar/editar/eliminar productos
- Todo con autenticación JWT

## Tests

Abrir el archivo SpecRunner.html en el navegador para ver los tests.

---
Noviembre 2025