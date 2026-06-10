package com.sweetcreampink.pagos.repository;

import com.sweetcreampink.pagos.entity.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Long> {
    List<MetodoPago> findByUsuarioId(Long usuId);
}