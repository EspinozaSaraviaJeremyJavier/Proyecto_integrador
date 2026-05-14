package Modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proId")
    private Long id;
    
    @Column(name = "proNombre")
    private String nombre;

    @Transient
    private String descripcion;

    @Transient
    private Double precio;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imagen;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}

    public Double getPrecio() {return precio;}
    public void setPrecio(Double precio) {this.precio = precio;}

    public byte[] getImagen() {return imagen;}
    public void setImagen(byte[] imagen) {this.imagen = imagen;}

}