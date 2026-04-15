package com.SweetCreamPink.demoSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Importado para seguridad
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller // Maneja la navegación y devuelve vistas (HTML/Thymeleaf)
public class mycontroller {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private ProductoRepository productoRepo;

    @Autowired
    private ComentarioRepository comentarioRepo;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Inyectado para validar claves

    @GetMapping("/") // Carga la página de inicio con productos y comentarios
    public String inicio(Model model) {
        model.addAttribute("productos", productoRepo.findAll());
        // Filtra solo comentarios aprobados para mostrar en el index
        List<Comentario> aprobados = comentarioRepo.findAll().stream()
                .filter(Comentario::isAprobado)
                .collect(Collectors.toList());
        model.addAttribute("comentariosAprobados", aprobados);
        return "index";
    }

    @GetMapping("/login") // Muestra el formulario de inicio de sesión
    public String mostrarLogin() {
        return "login";
    }

    @PostMapping("/ingresar") // Procesa el acceso desde el formulario HTML
    public String procesarLogin(@RequestParam String correo, 
                               @RequestParam String password, 
                               Model model) {
        Optional<Usuario> userOpt = usuarioRepo.findByCorreo(correo);

        // Compara contraseña plana con el hash de la BD usando BCrypt
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            // Redirige según el rol (1=ADMIN, otros=CLIENTE)
            return userOpt.get().getRolId() == 1 ? "redirect:/admin" : "redirect:/";
        } else {
            model.addAttribute("error", "Credenciales incorrectas");
            return "login";
        }
    }

    @GetMapping("/registro") // Muestra el formulario de creación de cuenta
    public String mostrarRegistro(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "registro";
    }

    @PostMapping("/registrar") // Guarda el nuevo usuario desde la web
    public String guardarUsuario(@ModelAttribute Usuario usuario, 
                                 @RequestParam String confirmPassword, 
                                 Model model) {
        // Valida que ambas contraseñas escritas sean iguales
        if (!usuario.getPassword().equals(confirmPassword)) {
            model.addAttribute("error", "Las contraseñas no coinciden");
            return "registro";
        }
        
        // Encripta la contraseña antes de guardar en MySQL
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setRolId(2); // Rol cliente por defecto
        usuarioRepo.save(usuario); 
        return "redirect:/login";
    }

    @PostMapping("/enviar-comentario") // Recibe y guarda comentarios pendientes de aprobación
    public String guardarComentario(@RequestParam String nombre, @RequestParam String contenido) {
        Comentario nuevo = new Comentario();
        nuevo.setNombre(nombre);
        nuevo.setContenido(contenido);
        nuevo.setAprobado(false); // Requiere revisión del administrador
        comentarioRepo.save(nuevo);
        return "redirect:/?mensaje=enviado";
    }
}