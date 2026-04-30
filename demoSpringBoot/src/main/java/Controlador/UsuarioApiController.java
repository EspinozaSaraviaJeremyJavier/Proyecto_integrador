package Controlador;

import Repository.UsuarioRepository;
import Modelo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;

@RestController // Controlador para manejar peticiones de la API en formato JSON
@RequestMapping("/api/usuarios") // Ruta principal para operaciones de usuario
@CrossOrigin(origins = "http://localhost:3000") // Permite comunicación con el frontend React
public class UsuarioApiController {

    @Autowired // Conexión automática con el repositorio de base de datos
    private UsuarioRepository usuarioRepo;

    @Autowired // Conexión con el componente de encriptación de seguridad
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/registrar") // Maneja la creación de nuevos usuarios desde React
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            // Verifica si el correo ya existe en la base de datos
            if (usuarioRepo.findByCorreo(usuario.getCorreo()).isPresent()) {
                return ResponseEntity.badRequest().body("El correo ya está registrado");
            }

            // Encripta la contraseña antes de mandarla a MySQL
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            
            usuario.setRolId(2); // Asigna rol CLIENTE por defecto
            Usuario guardado = usuarioRepo.save(usuario); // Guarda el registro
            return ResponseEntity.ok(guardado); // Retorna el usuario creado
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login") // Maneja el acceso de usuarios existentes
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario loginData) {
        // Busca al usuario por su correo
        Optional<Usuario> userOpt = usuarioRepo.findByCorreo(loginData.getCorreo());

        // Compara clave ingresada con el Hash almacenado usando BCrypt
        if (userOpt.isPresent() && passwordEncoder.matches(loginData.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.ok(userOpt.get()); // Retorna datos del usuario si coincide
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas"); // Error de acceso
        }
    }
}