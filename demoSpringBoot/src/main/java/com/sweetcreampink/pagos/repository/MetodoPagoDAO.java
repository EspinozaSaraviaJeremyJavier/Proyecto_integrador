package com.sweetcreampink.pagos.repository;

import com.sweetcreampink.pagos.entity.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MetodoPagoDAO extends JpaRepository<MetodoPago, Long> {
    List<MetodoPago> findByUsuarioId(Long usuId);
}