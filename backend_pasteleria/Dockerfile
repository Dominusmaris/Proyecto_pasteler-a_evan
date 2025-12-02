# Usar imagen base de Java 17
FROM eclipse-temurin:17-jdk-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos Maven
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Dar permisos al script mvnw
RUN chmod +x mvnw

# Descargar dependencias
RUN ./mvnw dependency:go-offline -B

# Copiar código fuente
COPY src src

# Construir la aplicación
RUN ./mvnw package -DskipTests

# Puerto que usa la app
EXPOSE 8080

# Comando para ejecutar la app
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "target/backend_pasteleria-0.0.1-SNAPSHOT.jar"]