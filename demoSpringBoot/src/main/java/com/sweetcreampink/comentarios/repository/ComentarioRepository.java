package com.sweetcreampink.comentarios.repository;

import com.sweetcreampink.comentarios.entity.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    // Aquí Java hereda automáticamente métodos como findById, save, y findAll
}