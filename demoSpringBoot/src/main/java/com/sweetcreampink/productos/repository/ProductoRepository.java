package com.sweetcreampink.productos.repository;

import com.sweetcreampink.productos.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}