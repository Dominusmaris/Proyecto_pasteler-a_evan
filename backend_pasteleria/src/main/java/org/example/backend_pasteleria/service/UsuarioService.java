package org.example.backend_pasteleria.service;

import org.example.backend_pasteleria.model.Usuario;
import org.example.backend_pasteleria.model.Rol;
import org.example.backend_pasteleria.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario registrar(Usuario usuario) {
        usuario.setContraseña(encoder.encode(usuario.getContraseña()));
        usuario.setRol(Rol.CLIENTE); // Por defecto
        return repository.save(usuario);
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscarPorCorreo(String correo) {
        return repository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("No existe un usuario con ese correo"));
    }

    public Usuario login(String correo, String contraseña) {
        Usuario usuario = buscarPorCorreo(correo);

        if (!encoder.matches(contraseña, usuario.getContraseña())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return usuario;
    }
}



