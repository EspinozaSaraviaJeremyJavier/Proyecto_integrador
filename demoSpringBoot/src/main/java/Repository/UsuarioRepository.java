package Repository;

import Modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Gestiona el acceso a datos de la entidad Usuario
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Genera automáticamente una consulta SQL para buscar por la columna 'usuCorreo'
    Optional<Usuario> findByCorreo(String correo);
}