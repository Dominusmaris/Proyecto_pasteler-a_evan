package org.example.backend_pasteleria.token;

import lombok.Data;

@Data
public class AuthRequest {
    private String correo;
    private String contraseña;
}
