package com.SweetCreamPink.demoSpringBoot;

import jakarta.persistence.*;

@Entity // Clase vinculada a una tabla de base de datos
@Table(name = "usuario") // Nombre de la tabla física en MySQL
public class Usuario {

    @Id // Llave primaria de la tabla
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Incremento automático del ID
    @Column(name = "usuId") // Nombre real de la columna en MySQL
    private Long id;

    @Column(name = "usuNombre") // Mapea atributo al campo usuNombre
    private String nombre;

    @Column(name = "usuApellido") // Mapea atributo al campo usuApellido
    private String apellido;

    @Column(name = "usuCorreo", unique = true) // Correo único (no permite duplicados)
    private String correo;

    @Column(name = "usuContrasena") // Almacena el Hash de la contraseña encriptada
    private String password;

    @Column(name = "usuTelefono") // Mapea atributo al campo usuTelefono
    private String telefono;

    @Column(name = "usuDireccion") // Mapea atributo al campo usuDireccion
    private String direccion;

    @Column(name = "rolId_fk") // Llave foránea que define el rol del usuario
    private Integer rolId;

    // Constructor vacío necesario para el funcionamiento de JPA
    public Usuario() {}

    // Getters y Setters: Métodos para acceder y modificar los datos del usuario
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Integer getRolId() { return rolId; }
    public void setRolId(Integer rolId) { this.rolId = rolId; }
}