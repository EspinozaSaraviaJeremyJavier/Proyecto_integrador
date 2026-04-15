package com.SweetCreamPink.demoSpringBoot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Indica que es un componente de acceso a datos (DAO)
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    // JpaRepository: Proporciona métodos CRUD (save, delete, findById) automáticamente
}