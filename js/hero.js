const slides = [
    {
        img: 'assets/products/torta_principal.jpg',
        title: 'Nuestros Especiales',
        text: 'Especiales para cualquier ocasión y disfrutar con las personas que más quieres.'
    },
    {
        img: 'assets/products/cupcake.jpg',
        title: 'Pack de Cupcakes',
        text: 'La combinación perfecta de sabores para compartir en tus reuniones.'
    },
    {
        img: 'assets/products/alfajores.png',
        title: 'Caja de Alfajores',
        text: 'Los mejores alfajores artesanales, suaves y con mucho dulce de leche.'
    }
];

function changeSlide(index) {
    // 1. Actualizar imagen, título y texto
    document.getElementById('hero-img').src = slides[index].img;
    document.getElementById('hero-title').innerText = slides[index].title;
    document.getElementById('hero-text').innerText = slides[index].text;

    // 2. Actualizar la clase "active" en los puntos
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}