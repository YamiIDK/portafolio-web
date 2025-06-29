document.addEventListener('DOMContentLoaded', function() {

    // --- Animación de "Fade-in" al hacer scroll ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.3, // El elemento debe ser 30% visible para activar la animación
        rootMargin: "0px 0px -50px 0px" // Empieza la animación un poco antes de que entre a la vista
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Validación del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que la página se recargue

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            formStatus.textContent = 'Por favor, completa todos los campos.';
            formStatus.style.color = 'var(--primary-color)';
            return;
        }

        // Simulación de envío del formulario
        formStatus.textContent = 'Gracias por tu mensaje. ¡Nos pondremos en contacto pronto!';
        formStatus.style.color = 'green';
        
        // Limpiar el formulario después de un envío exitoso
        contactForm.reset();

        // Quitar el mensaje de éxito después de 5 segundos
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });

});