package org.example.backend_pasteleria.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Pastelería - DSY1104")
                        .description("Sistema de gestión de pastelería con autenticación JWT y CRUD de productos")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Desarrollo FullStack II")
                                .email("dsy1104@universidad.cl")))
                .servers(List.of(
                        new Server()
                                .url("https://tu-app-render.onrender.com")
                                .description("Servidor de Producción (Render)"),
                        new Server()
                                .url("http://34.230.111.161:8082")
                                .description("Servidor AWS EC2"),
                        new Server()
                                .url("http://localhost:8082")
                                .description("Servidor de Desarrollo")))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Ingrese el token JWT")))
                .addSecurityItem(new SecurityRequirement()
                        .addList("Bearer Authentication"));
    }
}