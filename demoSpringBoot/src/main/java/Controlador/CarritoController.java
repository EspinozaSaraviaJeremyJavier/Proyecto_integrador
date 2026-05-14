package Controlador;

import Modelo.*;
import Repositorio.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional; // Necesario para @Transactional

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:3000") // Para conectar con tu React
public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private OrdenRepository ordenRepo; // Debes tener este repositorio creado

    @Autowired
    private DetalleOrdenRepository detalleOrdenRepo;


    @PostMapping("/checkout/{usuId}")
    @Transactional
    public ResponseEntity<?> procesarPedido(@PathVariable Long usuId, @RequestBody Orden datosOrden) {
        Usuario usuario = usuarioRepo.findById(usuId).get();
        List<CarritoItem> carrito = carritoRepo.findByUsuario(usuario);

        if (carrito.isEmpty()) return ResponseEntity.badRequest().body("Carrito vacío");

        // 1. Crear la cabecera de la orden
        Orden nuevaOrden = new Orden();
        nuevaOrden.setUsuario(usuario);
        nuevaOrden.setDireccionEntrega(datosOrden.getDireccionEntrega());
        nuevaOrden.setMetodoPago(datosOrden.getMetodoPago());
        nuevaOrden.setEstado(Orden.EstadoOrden.Pendiente);
        
        // Cálculo del total: Subtotal + IGV (18%) + Envío (S/ 12.00 según tus imágenes)
        double subtotal = carrito.stream().mapToDouble(CarritoItem::getSubtotal).sum();
        nuevaOrden.setTotal(subtotal * 1.18 + 12.00); 

        Orden ordenGuardada = ordenRepo.save(nuevaOrden);

        // 2. Convertir cada item del carrito en un DetalleOrden
        for (CarritoItem item : carrito) {
            DetalleOrden detalle = new DetalleOrden();
            detalle.setOrden(ordenGuardada);
            detalle.setProducto(item.getProducto());
            detalle.setVariante(item.getVariante());
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecio(item.getPrecioUnitario());
            detalleOrdenRepo.save(detalle);
        }

        // 3. Vaciar el carrito después de la compra
        carritoRepo.deleteByUsuario(usuario);

        return ResponseEntity.ok("Pedido #SRC-2026-" + ordenGuardada.getId() + " confirmado");
    }
}