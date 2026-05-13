package Modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "carrito_items")
public class CarritoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuId_fk")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "proId_fk")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "varId_fk")
    private ProductoVariante variante;

    private Integer cantidad;
    private Double precioUnitario;

    // Método corregido para calcular el subtotal real
    public Double getSubtotal() {
        return (precioUnitario != null && cantidad != null) ? precioUnitario * cantidad : 0.0;
    }

    // Getters y Setters estándar
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
    public ProductoVariante getVariante() { return variante; }
    public void setVariante(ProductoVariante variante) { this.variante = variante; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }
}   