package Modelo;

import jakarta.persistence.*;

@Entity // Marca la clase como una entidad de base de datos
@Table(name = "comentarios") // Mapea esta clase a la tabla "comentarios" en MySQL
public class Comentario {
    
    @Id // Define este campo como la llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID autoincremental en la BD
    private Long id;
    
    private String nombre; // Almacena el nombre del autor del comentario
    private String contenido; // Almacena el texto del comentario
    private boolean aprobado; // Estado para moderación (true/false)

    // Getters y Setters: Métodos para obtener y modificar los atributos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }
    public boolean isAprobado() { return aprobado; }
    public void setAprobado(boolean aprobado) { this.aprobado = aprobado; }
}