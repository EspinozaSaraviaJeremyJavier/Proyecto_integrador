package com.SweetCreamPink.demoSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController // Define la clase como un controlador de API JSON
@RequestMapping("/api/productos") // Ruta base para las peticiones de productos
@CrossOrigin(origins = "http://localhost:3000") // Permite que React acceda a los datos
public class ProductoController {

    @Autowired // Conecta automáticamente con el repositorio de productos
    private ProductoRepository productoRepo;

    @GetMapping // Maneja peticiones GET para obtener la lista completa
    public List<Producto> listar() {
        return productoRepo.findAll(); // Retorna todos los registros de la tabla
    }

    @PostMapping("/guardar") // Maneja peticiones POST para crear productos
    public Producto guardar(@RequestParam("nombre") String nombre,
                           @RequestParam("precio") Double precio,
                           @RequestParam("descripcion") String descripcion,
                           @RequestParam("archivo") MultipartFile archivo) throws IOException {
        Producto p = new Producto();
        p.setNombre(nombre);
        p.setPrecio(precio);
        p.setDescripcion(descripcion);
        p.setImagen(archivo.getBytes()); // Convierte la imagen subida a formato binario
        
        return productoRepo.save(p); // Almacena el nuevo producto en MySQL
    }
}