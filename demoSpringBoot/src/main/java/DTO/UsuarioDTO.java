package DTO;

public class UsuarioDTO {
    private String nombre;
    private String email;
    private String rol;

    // Constructores, Getters y Setters
    public UsuarioDTO(String nombre, String email, String rol) {
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
    }
    
    public String getNombre() { return nombre; }
    public String getRol() { return rol; }
}
