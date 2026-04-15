package com.SweetCreamPink.demoSpringBoot;

import org.springframework.data.jpa.repository.JpaRepository;

// Proporciona métodos CRUD automáticos para la entidad Producto usando su ID (Long)
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}