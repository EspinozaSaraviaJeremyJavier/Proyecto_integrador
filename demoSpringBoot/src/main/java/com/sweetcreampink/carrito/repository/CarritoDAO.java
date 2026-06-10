package com.sweetcreampink.carrito.repository;

import com.sweetcreampink.carrito.model.CarritoItem;
import com.sweetcreampink.usuarios.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import com.sweetcreampink.productos.entity.Producto;
import com.sweetcreampink.productos.entity.ProductoVariante;

public interface CarritoDAO extends JpaRepository<CarritoItem, Long> {
    List<CarritoItem> findByUsuario(Usuario usuario);
    Optional<CarritoItem> findByUsuarioAndProductoAndVariante(Usuario usuario, Producto producto, ProductoVariante variante);
    void deleteByUsuario(Usuario usuario);
}