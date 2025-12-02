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
                        .title("API de Pastelería")
                        .version("1.0")
                        .description("API REST para gestión de productos y usuarios de pastelería")
                        .contact(new Contact()
                                .name("Equipo Pastelería")
                                .email("contacto@pasteleria.com")))
                .addServersItem(new Server()
                        .url("https://pasteleria-backend-dlry.onrender.com")
                        .description("Servidor de Producción (Render)"))
                .addServersItem(new Server()
                        .url("http://localhost:8082")
                        .description("Servidor de Desarrollo"))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Ingresa el token JWT sin el prefijo 'Bearer'")));
    }
}