package Controlador;

import Modelo.Producto;
import Repositorio.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:3000") // Permite conexión con React
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepo;

    // Obtener todos los productos para la tienda
    @GetMapping
    public List<Producto> listar() {
        return productoRepo.findAll();
    }

    // Guardar nuevo producto con imagen desde el Admin
    @PostMapping("/guardar")
    public Producto guardar(@RequestParam("nombre") String nombre,
                           @RequestParam("precio") Double precio,
                           @RequestParam("descripcion") String descripcion,
                           @RequestParam("archivo") MultipartFile archivo) throws IOException {
        Producto p = new Producto();
        p.setNombre(nombre);
        p.setPrecio(precio);
        p.setDescripcion(descripcion);
        p.setImagen(archivo.getBytes()); // Convierte el archivo a bytes para la BD
        return productoRepo.save(p);
    }
}