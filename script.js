document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para el Scroll Suave ---
    // No se necesita JS para esto si usamos `scroll-behavior: smooth;` en CSS.
    // Pero si se quiere compatibilidad con navegadores antiguos, se puede agregar aquí.
    // Por simplicidad y modernidad, confiamos en el CSS.

    // --- Lógica del Slider de Habilidades ---
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Función para determinar cuántos slides son visibles
    const getVisibleSlides = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth > 768) return 4;
        if (screenWidth > 480) return 2;
        return 1;
    };

    let visibleSlides = getVisibleSlides();

    // Actualiza la posición del slider
    const updateSliderPosition = () => {
        const slideWidth = slider.clientWidth / visibleSlides;
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    };

    // Mover al siguiente slide
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - visibleSlides) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Mover al slide anterior
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });
    
    // Ajustar el slider si cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        visibleSlides = getVisibleSlides();
        // Resetea el índice si la vista cambia para evitar espacios en blanco
        if (currentIndex > totalSlides - visibleSlides) {
            currentIndex = totalSlides - visibleSlides;
        }
        updateSliderPosition();
    });
    
    // --- Lógica del Formulario de Contacto (Prevención de envío de ejemplo) ---
    const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function () {
    // Esperamos unos milisegundos para dejar que el formulario se envíe
    setTimeout(() => {
        alert('¡Gracias por tu mensaje! Te responderé pronto.');
    }, 500); // tiempo suficiente para que Formspree procese
});

});