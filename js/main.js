// Global Variables
let swiper;
let projects = [];
let currentLang = 'es';

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const langSwitch = document.getElementById('lang-switch');
const expandBtn = document.getElementById('expand-projects');
const projectsSlider = document.getElementById('projects-slider');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contact-form');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM cargado, inicializando...");
  
  initializeAOS();
  initializeMobileMenu();
  initializeLanguageSwitch();
  loadProjects(); // Esta función iniciará la carga de proyectos
  initializeContactForm();
  
  // Add scroll effect to header
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Forzar carga inicial de traducciones
  loadTranslations();
});

// AOS Initialization
function initializeAOS() {
  try {
    // Asegúrate de que la librería AOS.js esté cargada en el HTML
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100
      });
      console.log("AOS inicializado correctamente");
    } else {
      console.warn("AOS no está definido. Asegúrate de incluir la librería.");
    }
  } catch (error) {
    console.error("Error al inicializar AOS:", error);
  }
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
}

// Mobile Menu
function initializeMobileMenu() {
  if (!mobileMenuBtn || !mobileMenu) {
    console.error("No se encontraron elementos del menú móvil");
    return;
  }
  
  console.log("Inicializando menú móvil");
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    mobileMenu.classList.toggle('active');
    
    // Toggle body overflow
    document.body.classList.toggle('menu-open');
    
    // Toggle aria-expanded for accessibility
    const isExpanded = mobileMenu.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'Cerrar menú' : 'Abrir menú');
    
    console.log("Menú móvil toggled:", isExpanded);
  });
  
  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
      }
    }
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
    }
  });
  
  console.log("Menú móvil inicializado correctamente");
}

// Language Switch
function initializeLanguageSwitch() {
  if (langSwitch) {
    langSwitch.addEventListener('change', (e) => {
      currentLang = e.target.value;
      document.documentElement.lang = currentLang;
      loadTranslations();
    });
    console.log("Selector de idioma inicializado");
  } else {
    console.error("No se encontró el selector de idioma");
  }
}

// Load Translations
async function loadTranslations() {
  try {
    console.log(`Cargando traducciones para idioma: ${currentLang}`);
    const response = await fetch(`lang/${currentLang}.json`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const translations = await response.json();
    console.log("Traducciones cargadas:", translations);
    updatePageText(translations);
  } catch (error) {
    console.error('Error loading translations:', error);
    showDefaultText();
  }
}

// Show default text if translations fail
function showDefaultText() {
  console.log("Mostrando texto por defecto");
  
  // Update header name
  const headerName = document.getElementById('header-name');
  if (headerName) {
    headerName.textContent = "Cristian Gallardo";
  }
  
  // Update navigation
  document.querySelectorAll('nav a').forEach((link, index) => {
    const defaultTexts = ['Inicio', 'Mi Perfil', 'Habilidades', 'Proyectos', 'Contacto'];
    if (defaultTexts[index]) {
      link.textContent = defaultTexts[index];
    }
  });
  
  // Update hero title
  const heroTitle = document.querySelector('#inicio h1');
  if (heroTitle) {
    heroTitle.textContent = "Arquitecto de Soluciones Digitales y Desarrollador Web Full Stack";
  }
  
  // Update hero subtitle
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.textContent = "Construyo plataformas digitales robustas y escalables, enfocadas en ofrecer alto valor técnico a costos sostenibles para negocios en crecimiento.";
  }
  
  // Update contact form elements
  const contactTitle = document.getElementById('contact-title');
  if (contactTitle) {
    contactTitle.textContent = "Colaboremos en tu Próxima Solución Digital";
  }
  
  const contactSubtitle = document.getElementById('contact-subtitle');
  if (contactSubtitle) {
    contactSubtitle.textContent = "Si tu negocio requiere una plataforma robusta y un enfoque técnico eficiente en costos, contáctame para evaluar tu proyecto sin compromiso.";
  }
  
  const nameLabel = document.getElementById('contact-name-label');
  if (nameLabel) {
    nameLabel.textContent = "Nombre";
  }
  
  const emailLabel = document.getElementById('contact-email-label');
  if (emailLabel) {
    emailLabel.textContent = "Email";
  }
  
  const messageLabel = document.getElementById('contact-message-label');
  if (messageLabel) {
    messageLabel.textContent = "Mensaje";
  }
  
  const submitBtn = document.getElementById('contact-submit-btn');
  if (submitBtn) {
    submitBtn.textContent = "Enviar Mensaje";
  }
  
  const directContactText = document.getElementById('contact-direct-text');
  if (directContactText) {
    directContactText.textContent = "O contáctame directamente:";
  }
  
  // Update section titles
  const titles = document.querySelectorAll('h2');
  titles.forEach(title => {
    if (title.id === 'perfil') title.textContent = 'Mi Perfil';
    else if (title.id === 'habilidades') title.textContent = 'Habilidades Técnicas';
    else if (title.id === 'proyectos') title.textContent = 'Proyectos Recientes';
    else if (title.id === 'contacto') title.textContent = 'Contacto';
  });
}

// Update Page Text
function updatePageText(translations) {
  console.log("Actualizando textos de la página");
  
  // Update header name
  if (translations.header && translations.header.name) {
    const headerName = document.getElementById('header-name');
    if (headerName) {
      headerName.textContent = translations.header.name;
    }
  }
  
  // Update navigation
  if (translations.header) {
    document.querySelectorAll('nav a').forEach((link, index) => {
      const keys = ['home', 'profile', 'skills', 'projects', 'contact'];
      if (translations.header[keys[index]]) {
        link.textContent = translations.header[keys[index]];
      }
    });
  }

  // Update Hero Section
  if (translations.hero) {
    const heroTitle = document.querySelector('#inicio h1');
    if (heroTitle) heroTitle.textContent = translations.hero.title;
    
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = translations.hero.subtitle;
    
    const heroCtas = document.querySelectorAll('#inicio .flex.flex-wrap.gap-4 a');
    if (heroCtas[0] && translations.hero.cta1) heroCtas[0].textContent = translations.hero.cta1;
    if (heroCtas[1] && translations.hero.cta2) heroCtas[1].textContent = translations.hero.cta2;
  }

  // Update Profile Section
  if (translations.profile) {
    const profileTitle = document.querySelector('#perfil h2');
    if (profileTitle) profileTitle.textContent = translations.profile.title;
    
    const perspectiveTitle = document.querySelector('#perfil h3');
    if (perspectiveTitle && translations.profile.perspective) {
      perspectiveTitle.textContent = translations.profile.perspective;
    }
    
    const perspectiveText = perspectiveTitle?.nextElementSibling;
    if (perspectiveText && translations.profile.perspective_text) {
      perspectiveText.textContent = translations.profile.perspective_text;
    }
    
    const educationalTitle = perspectiveText?.nextElementSibling;
    if (educationalTitle && translations.profile.educational) {
      educationalTitle.textContent = translations.profile.educational;
    }
    
    const educationalText = educationalTitle?.nextElementSibling;
    if (educationalText && translations.profile.educational_text) {
      educationalText.textContent = translations.profile.educational_text;
    }
    
    const trajectoryTitle = educationalText?.nextElementSibling;
    if (trajectoryTitle && translations.profile.trajectory) {
      trajectoryTitle.textContent = translations.profile.trajectory;
    }
    
    const trajectoryItems = document.querySelectorAll('#perfil ul li span:last-child');
    if (trajectoryItems.length > 0 && translations.profile.trajectory_items) {
      trajectoryItems.forEach((item, index) => {
        if (translations.profile.trajectory_items[index]) {
          item.textContent = translations.profile.trajectory_items[index];
        }
      });
    }
  }

  // Update Skills Section
  if (translations.skills) {
    const skillsTitle = document.querySelector('#habilidades h2');
    if (skillsTitle) skillsTitle.textContent = translations.skills.title;
  }

  // Update Projects Section
  if (translations.projects) {
    const projectsTitle = document.querySelector('#proyectos h2');
    if (projectsTitle) projectsTitle.textContent = translations.projects.title;
    
    if (expandBtn && translations.projects.expand) {
      expandBtn.textContent = translations.projects.expand;
    }
  }

  // Update Contact Section
  if (translations.contact) {
    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = translations.contact.title;
    
    const contactSubtitle = document.getElementById('contact-subtitle');
    if (contactSubtitle) contactSubtitle.textContent = translations.contact.subtitle;
    
    const nameLabel = document.getElementById('contact-name-label');
    if (nameLabel && translations.contact.form_name) {
      nameLabel.textContent = translations.contact.form_name;
    }
    
    const emailLabel = document.getElementById('contact-email-label');
    if (emailLabel && translations.contact.form_email) {
      emailLabel.textContent = translations.contact.form_email;
    }
    
    const messageLabel = document.getElementById('contact-message-label');
    if (messageLabel && translations.contact.form_message) {
      messageLabel.textContent = translations.contact.form_message;
    }
    
    const submitBtn = document.getElementById('contact-submit-btn');
    if (submitBtn && translations.contact.form_submit) {
      submitBtn.textContent = translations.contact.form_submit;
    }
    
    const directContactText = document.getElementById('contact-direct-text');
    if (directContactText && translations.contact.direct_contact) {
      directContactText.textContent = translations.contact.direct_contact;
    }
  }

  // Update Footer
  if (translations.footer) {
    const footerText = document.querySelector('footer p');
    if (footerText) footerText.textContent = translations.footer.copyright;
  }
}

// Load Projects from local folder
async function loadProjects() {
  try {
    console.log("Cargando proyectos...");
    
    // Mostrar indicador de carga
    if (projectsSlider) {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      if (swiperWrapper) {
        swiperWrapper.innerHTML = '<div class="swiper-slide text-center py-8">Cargando proyectos...</div>';
      }
    }
    
    // Obtener la lista de carpetas de proyectos (Corregido)
    const projectFolders = await detectProjectFolders();
    console.log("Carpetas de proyectos encontradas:", projectFolders);
    
    if (projectFolders.length === 0) {
      console.log("No se encontraron proyectos");
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      if (swiperWrapper) {
        swiperWrapper.innerHTML = '<div class="swiper-slide"><p class="text-center py-8">No se encontraron proyectos. Verifica projects-list.json.</p></div>';
      }
      return;
    }
    
    // Cargar cada proyecto
    const projectPromises = projectFolders.map(folder => loadProject(folder));
    await Promise.all(projectPromises);
    
    // Inicializar slider después de cargar proyectos
    initializeProjectsSlider();
    
  } catch (error) {
    console.error('Error general al cargar proyectos:', error);
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
      swiperWrapper.innerHTML = '<div class="swiper-slide"><p class="text-center py-8">Error al cargar proyectos</p></div>';
    }
  }
}

// Función simplificada para cargar proyectos desde projects-list.json
async function detectProjectFolders() {
  try {
    console.log('Intentando cargar projects-list.json...');
    const response = await fetch('projects-list.json'); // Asume que está en la raíz
    
    if (!response.ok) {
      console.warn('No se encontró projects-list.json o hubo un error HTTP. Detalle:', response.statusText);
      return [];
    }
    
    const projectList = await response.json();
    
    if (!Array.isArray(projectList)) {
      console.error("El contenido de projects-list.json no es un array válido. Formato esperado: ['proyecto1', 'proyecto2']");
      return [];
    }

    return projectList;
    
  } catch (error) {
    console.error('Error al parsear projects-list.json (formato inválido):', error);
    return [];
  }
}

// Load Individual Project
async function loadProject(projectFolder) {
  try {
    console.log(`Cargando proyecto: ${projectFolder}`);
    
    // Get project.json
    const response = await fetch(`proyectos/${projectFolder}/project.json`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP al cargar project.json: ${response.status}`);
    }
    
    const projectData = await response.json();
    console.log(`Datos del proyecto ${projectFolder} cargados`);
    
    // Set image URL (local path)
    projectData.imageUrl = `proyectos/${projectFolder}/${projectData.image}`;
    
    projects.push(projectData);
    
  } catch (error) {
    console.error(`Error loading project ${projectFolder}:`, error);
  }
}

// Initialize Projects Slider
function initializeProjectsSlider() {
  if (!projectsSlider) {
    console.error("No se encontró el contenedor del slider");
    return;
  }
  
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) {
    console.error("No se encontró el contenedor swiper-wrapper");
    return;
  }
  
  // Clear existing content
  swiperWrapper.innerHTML = '';
  
  if (projects.length === 0) {
    console.log("No hay proyectos para mostrar");
    swiperWrapper.innerHTML = '<div class="swiper-slide"><p class="text-center py-8">No projects found</p></div>';
    return;
  }
  
  // Add projects to slider
  projects.forEach(project => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = createProjectCard(project);
    swiperWrapper.appendChild(slide);
  });
  
  // Inicializa Swiper (asegúrate que Swiper.js esté cargado en tu HTML)
  try {
    if (typeof Swiper !== 'undefined') {
      // Destruye la instancia anterior si existe
      if (swiper) {
        swiper.destroy(true, true);
      }
      
      const singleProject = projects.length === 1;
      
      swiper = new Swiper('.swiper', {
        loop: !singleProject, 
        autoplay: !singleProject ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false,
        pagination: !singleProject ? {
          el: '.swiper-pagination',
          clickable: true,
        } : false,
        navigation: !singleProject ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        } : false,
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: singleProject ? 1 : 2, 
            spaceBetween: 20,
          },
          1024: {
            // Asegura que se pueda deslizar si hay más de 3 proyectos
            slidesPerView: projects.length >= 4 ? 3 : (projects.length >= 2 ? 2 : 1),
            spaceBetween: 20,
          },
        },
        // Performance optimizations
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
      });
    
      console.log("Swiper inicializado correctamente");
    } else {
      console.warn("Swiper no está definido. Asegúrate de incluir la librería.");
    }

  } catch (error) {
    console.error("Error al inicializar Swiper:", error);
  }
  
  // Initialize expand button
  initializeExpandButton();
}

// Create Project Card HTML (Corregido: sin swiper-lazy-preloader)
function createProjectCard(project) {
  return `
    <div class="project-card h-full">
      <img src="${project.imageUrl || 'assets/img/default-project.jpg'}" alt="${project.title}" loading="lazy">
      
      <div class="project-card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="mt-4 flex space-x-3">
          <a href="${project.githubUrl}" target="_blank" class="text-sm btn-primary">
            Código
          </a>
          ${project.demoUrl ? `
            <a href="${project.demoUrl}" target="_blank" class="text-sm border border-[#722671] hover:bg-[#722671]/20 px-3 py-1 rounded transition">
              Demo
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Initialize Expand Button
function initializeExpandButton() {
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      // Stop swiper autoplay
      if (swiper && swiper.autoplay) {
        swiper.autoplay.stop();
      }
      
      // Hide slider (y su contenedor principal)
      const swiperContainer = document.querySelector('.swiper-container-wrapper');
      if (swiperContainer) swiperContainer.style.display = 'none';

      // Hide expand button
      if (expandBtn) expandBtn.style.display = 'none';
      
      // Show grid
      if (projectsGrid) {
        projectsGrid.classList.remove('hidden');
        projectsGrid.innerHTML = '';
        
        // Add projects to grid
        projects.forEach(project => {
          const gridItem = document.createElement('div');
          gridItem.innerHTML = createProjectCard(project);
          projectsGrid.appendChild(gridItem);
        });
        
        // NUEVA CORRECCIÓN: Usar un div contenedor para centrar el botón y controlar su altura.
        const closeBtnContainer = document.createElement('div');
        
        // Damos al contenedor el margen, lo hacemos flex para centrar, ocupa todo el ancho de la columna
        // y 'self-start' para evitar que se estire verticalmente.
        closeBtnContainer.className = 'mt-8 flex justify-center col-span-full self-start'; 
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cerrar';
        
        // El botón solo necesita la clase btn-primary. 
        closeBtn.className = 'btn-primary'; 
        closeBtn.addEventListener('click', closeProjectsGrid);
        
        // Añadir el botón al contenedor y el contenedor al grid
        closeBtnContainer.appendChild(closeBtn);
        projectsGrid.appendChild(closeBtnContainer);
      }
    });
  }
}

// Close Projects Grid
function closeProjectsGrid() {
  // Show slider (y su contenedor principal)
  const swiperContainer = document.querySelector('.swiper-container-wrapper');
  if (swiperContainer) swiperContainer.style.display = 'block';

  // Show expand button
  if (expandBtn) expandBtn.style.display = 'block';
  
  // Hide grid
  if (projectsGrid) projectsGrid.classList.add('hidden');
  
  // Restart swiper autoplay
  if (swiper && swiper.autoplay) {
    swiper.autoplay.start();
  }
}

// Contact Form
function initializeContactForm() {
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Mostrar estado de carga
      const submitBtn = document.getElementById('contact-submit-btn');
      const originalButtonText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      try {
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        
        const response = await fetch('https://formspree.io/f/xovwylld', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formObject)
        });
        
        if (response.ok) {
          alert('¡Mensaje enviado con éxito!');
          contactForm.reset();
        } else {
          // Intenta leer el error de Formspree
          let errorText = 'Error al enviar el mensaje';
          try {
            const errorJson = await response.json();
            if (errorJson.error) {
              errorText += `: ${errorJson.error}`;
            }
          } catch {}
          throw new Error(errorText);
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde. Detalle: ${error.message}`);
      } finally {
        // Restaurar botón de envío
        submitBtn.disabled = false;
        submitBtn.textContent = originalButtonText;
      }
    });
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Touch support for mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  
  if (!mobileMenu || !mobileMenuBtn) return;
  
  let touchStartY = 0;
  let touchEndY = 0;
  
  // Handle touch events for swipe gestures
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    // Swipe up to close menu
    if (swipeDistance > swipeThreshold && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
    }
  }
});