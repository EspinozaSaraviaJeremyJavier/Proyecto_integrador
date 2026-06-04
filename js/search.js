document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página se refresque sola
        
        // Obtenemos lo que escribiste
        const textoBusqueda = document.getElementById('searchInput').value;
        
        if (textoBusqueda.trim() !== "") {
            // Aquí le decimos a dónde ir. 
            // Esto redirige a productos.html y le pasa lo que buscaste
            window.location.href = "productos.html?buscar=" + encodeURIComponent(textoBusqueda);
        }
    });