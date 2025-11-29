package org.example.backend_pasteleria.controller;

import org.example.backend_pasteleria.model.Usuario;
import org.example.backend_pasteleria.service.UsuarioService;
import org.example.backend_pasteleria.token.AuthRequest;
import org.example.backend_pasteleria.token.AuthResponse;
import org.example.backend_pasteleria.token.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.registrar(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {

        Usuario usuario = usuarioService.login(request.getCorreo(), request.getContraseña());

        String token = jwtUtil.generarToken(usuario.getCorreo(), usuario.getRol().name());

        return ResponseEntity.ok(new AuthResponse(token, usuario.getRol().name()));
    }
}
