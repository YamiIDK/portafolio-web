document.addEventListener('DOMContentLoaded', function () {

    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.slider__button--prev');
    const nextButton = document.querySelector('.slider__button--next');

    let currentSlide = 0;

    function showSlide(index) {
        // Oculta todas las diapositivas
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        // Muestra la diapositiva solicitada
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event Listeners para los botones
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Muestra la primera diapositiva al cargar
    showSlide(currentSlide);

    // Opcional: Cambio automático de diapositivas
    setInterval(nextSlide, 7000); // Cambia cada 7 segundos

});