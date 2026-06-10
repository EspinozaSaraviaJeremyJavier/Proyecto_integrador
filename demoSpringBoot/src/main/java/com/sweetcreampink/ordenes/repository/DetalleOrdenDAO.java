package com.sweetcreampink.ordenes.repository;

import com.sweetcreampink.ordenes.entity.DetalleOrden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleOrdenDAO extends JpaRepository<DetalleOrden, Integer> {
}