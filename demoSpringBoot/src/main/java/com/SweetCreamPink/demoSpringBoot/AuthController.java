package com.SweetCreamPink.demoSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController // Define clase como API REST que devuelve datos JSON
@RequestMapping("/api/auth") // Ruta base de los endpoints de autenticación
@CrossOrigin(origins = "http://localhost:3000") // Permite acceso desde el frontend React
public class AuthController {

    @Autowired // Inyecta automáticamente el repositorio de usuarios
    private UsuarioRepository usuarioRepo;

    @Autowired // Inyecta el motor de encriptación configurado
    private BCryptPasswordEncoder passwordEncoder; 

    @PostMapping("/login") // Endpoint para iniciar sesión
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest req) {
        Map<String, Object> respuesta = new HashMap<>();

        // Busca usuario por correo en la BD
        Optional<Usuario> userOpt = usuarioRepo.findByCorreo(req.getCorreo());

        // Compara contraseña ingresada con el hash guardado en BD
        if (userOpt.isEmpty() || !passwordEncoder.matches(req.getPassword(), userOpt.get().getPassword())) {
            respuesta.put("mensaje", "Correo o contraseña incorrectos.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(respuesta);
        }

        Usuario usuario = userOpt.get();
        respuesta.put("id", usuario.getId());
        respuesta.put("nombre", usuario.getNombre());
        respuesta.put("correo", usuario.getCorreo());
        // Asigna etiqueta según el ID del rol
        respuesta.put("rol", usuario.getRolId() == 1 ? "ADMIN" : "CLIENTE");
        respuesta.put("mensaje", "Login exitoso.");

        return ResponseEntity.ok(respuesta); // Devuelve datos y estado 200
    }

    @PostMapping("/registrar") // Endpoint para crear nuevos usuarios
    public ResponseEntity<Map<String, Object>> registrar(@RequestBody RegistroRequest req) {
        Map<String, Object> respuesta = new HashMap<>();

        // Verifica si el correo ya existe para evitar duplicados
        if (usuarioRepo.findByCorreo(req.getCorreo()).isPresent()) {
            respuesta.put("mensaje", "Ese correo ya está registrado.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(respuesta);
        }

        // Valida que no haya campos vacíos
        if (req.getNombre() == null || req.getNombre().isBlank()
         || req.getCorreo() == null || req.getCorreo().isBlank()
         || req.getPassword() == null || req.getPassword().isBlank()) {
            respuesta.put("mensaje", "Todos los campos son obligatorios.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
        }

        Usuario nuevo = new Usuario();
        nuevo.setNombre(req.getNombre());
        nuevo.setCorreo(req.getCorreo());
        
        // Encripta la clave antes de guardarla en la BD
        String passwordHasheada = passwordEncoder.encode(req.getPassword());
        nuevo.setPassword(passwordHasheada);
        
        nuevo.setRolId(2); // Asigna rol cliente por defecto
        usuarioRepo.save(nuevo); // Guarda el usuario en MySQL

        respuesta.put("mensaje", "Registro exitoso.");
        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
    }

    // Estructura para recibir datos de Login desde React
    static class LoginRequest {
        private String correo;
        private String password;
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // Estructura para recibir datos de Registro desde React
    static class RegistroRequest {
        private String nombre;
        private String correo;
        private String password;
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}