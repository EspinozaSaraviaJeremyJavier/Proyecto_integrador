package com.SweetCreamPink.demoSpringBoot;

import jakarta.persistence.*;

@Entity // Convierte la clase en una entidad de base de datos
@Table(name = "productos") // Vincula la clase con la tabla "productos" en MySQL
public class Producto {
    @Id // Marca el campo como llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera IDs autoincrementales
    private Long id;
    
    private String nombre; // Nombre comercial del producto
    private String descripcion; // Detalle o características del producto
    private Double precio; // Costo unitario del producto

    @Lob // Indica que el campo manejará un objeto grande (Large Object)
    @Column(columnDefinition = "LONGBLOB") // Define el tipo de dato en MySQL para archivos pesados
    private byte[] imagen; // Almacena el archivo de imagen en formato binario

    public Producto() {} // Constructor vacío requerido por JPA

    // Getters y Setters: Métodos para leer y escribir los datos del producto
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
    public byte[] getImagen() { return imagen; }
    public void setImagen(byte[] imagen) { this.imagen = imagen; }
}