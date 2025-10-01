// Global Variables
let swiper;
let projects = [];
let currentLang = 'es';

// DOM Elements - Verificamos que existan antes de usarlos
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
  loadProjects();
  initializeContactForm();
  
  // Add scroll effect to header
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Forzar carga inicial de traducciones
  loadTranslations();
});

// AOS Initialization
function initializeAOS() {
  try {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
    console.log("AOS inicializado correctamente");
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
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
    console.log("Menú móvil inicializado");
  } else {
    console.error("No se encontraron elementos del menú móvil");
  }
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
    // Mostrar texto por defecto si falla la carga
    showDefaultText();
  }
}

// Show default text if translations fail
function showDefaultText() {
  console.log("Mostrando texto por defecto");
  
  // Update header name (específico)
  const headerName = document.getElementById('header-name');
  if (headerName) {
    headerName.textContent = "Cristian Gallardo";
  }
  
  // Actualizar navegación
  document.querySelectorAll('nav a').forEach((link, index) => {
    const defaultTexts = ['Inicio', 'Mi Perfil', 'Habilidades', 'Proyectos', 'Contacto'];
    if (defaultTexts[index]) {
      link.textContent = defaultTexts[index];
    }
  });
  
  // Actualizar título del hero
  const heroTitle = document.querySelector('#inicio h1');
  if (heroTitle) {
    heroTitle.textContent = "Arquitecto de Soluciones Digitales y Desarrollador Web Full Stack";
  }
  
  // Actualizar subtítulo del hero
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.textContent = "Construyo plataformas digitales robustas y escalables, enfocadas en ofrecer alto valor técnico a costos sostenibles para negocios en crecimiento.";
  }
  
  // Actualizar elementos del formulario de contacto
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
  
  // Actualizar títulos
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
  
  // Update header name (específico para el header)
  if (translations.header && translations.header.name) {
    const headerName = document.getElementById('header-name');
    if (headerName) {
      headerName.textContent = translations.header.name;
      console.log("Nombre del header actualizado:", translations.header.name);
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

  // Update Hero Section (con selectores específicos)
  if (translations.hero) {
    // Título del hero (específico)
    const heroTitle = document.querySelector('#inicio h1');
    if (heroTitle) heroTitle.textContent = translations.hero.title;
    
    // Subtítulo del hero (ahora con ID específico)
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = translations.hero.subtitle;
    
    // CTAs del hero (más específicos)
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

  // Update Contact Section (CON SELECTORES ESPECÍFICOS)
  if (translations.contact) {
    // Título de la sección de contacto
    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = translations.contact.title;
    
    // Subtítulo de la sección de contacto
    const contactSubtitle = document.getElementById('contact-subtitle');
    if (contactSubtitle) contactSubtitle.textContent = translations.contact.subtitle;
    
    // Labels del formulario
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
    
    // Botón de envío
    const submitBtn = document.getElementById('contact-submit-btn');
    if (submitBtn && translations.contact.form_submit) {
      submitBtn.textContent = translations.contact.form_submit;
    }
    
    // Texto de contacto directo
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

// Load Projects from GitHub
async function loadProjects() {
  const repoOwner = 'YamiIDK';
  const repoName = 'proyectos';
  const projectsPath = 'projects';
  
  // Obtener el token de la configuración
  const token = window.config.githubToken;
  
  if (!token) {
    console.error('No se encontró el token de GitHub');
    if (projectsSlider) {
      projectsSlider.innerHTML = '<p class="text-center">Error: GitHub token not found</p>';
    }
    return;
  }
  
  try {
    console.log("Cargando proyectos desde GitHub...");
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${projectsPath}`,
      {
        headers: {
          Authorization: `token ${token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const directories = await response.json();
    console.log("Directorios encontrados:", directories);
    
    // Load each project
    for (const dir of directories) {
      if (dir.type === 'dir') {
        await loadProject(repoOwner, repoName, dir.path);
      }
    }
    
    // Initialize slider after loading projects
    initializeProjectsSlider();
    
  } catch (error) {
    console.error('Error loading projects:', error);
    if (projectsSlider) {
      projectsSlider.innerHTML = '<p class="text-center">Error loading projects</p>';
    }
  }
}

// Load Individual Project
async function loadProject(owner, repo, projectPath) {
  try {
    console.log(`Cargando proyecto: ${projectPath}`);
    // Get project.json
    const jsonResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${projectPath}/project.json`,
      {
        headers: {
          Authorization: `token ${token}`
        }
      }
    );
    
    if (!jsonResponse.ok) {
      throw new Error(`Error HTTP: ${jsonResponse.status}`);
    }
    
    const jsonData = await jsonResponse.json();
    const projectData = JSON.parse(atob(jsonData.content));
    console.log(`Datos del proyecto ${projectPath}:`, projectData);
    
    // Get image URL
    const imageResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${projectPath}/${projectData.image}`,
      {
        headers: {
          Authorization: `token ${token}`
        }
      }
    );
    
    if (!imageResponse.ok) {
      throw new Error(`Error HTTP: ${imageResponse.status}`);
    }
    
    const imageData = await imageResponse.json();
    projectData.imageUrl = imageData.download_url;
    
    projects.push(projectData);
    
  } catch (error) {
    console.error(`Error loading project ${projectPath}:`, error);
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
    swiperWrapper.innerHTML = '<div class="swiper-slide"><p class="text-center">No projects found</p></div>';
    return;
  }
  
  // Add projects to slider
  projects.forEach(project => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = createProjectCard(project);
    swiperWrapper.appendChild(slide);
  });
  
  // Initialize Swiper
  try {
    swiper = new Swiper('.swiper', {
      loop: projects.length > 1, // Only loop if there are multiple projects
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
    console.log("Swiper inicializado correctamente");
  } catch (error) {
    console.error("Error al inicializar Swiper:", error);
  }
  
  // Initialize expand button
  initializeExpandButton();
}

// Create Project Card HTML
function createProjectCard(project) {
  return `
    <div class="project-card h-full">
      <img src="${project.imageUrl || 'https://via.placeholder.com/400x200'}" alt="${project.title}">
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
      
      // Hide slider
      if (projectsSlider) projectsSlider.style.display = 'none';
      if (expandBtn) expandBtn.style.display = 'none';
      
      // Show grid
      if (projectsGrid) {
        projectsGrid.classList.remove('hidden');
        projectsGrid.innerHTML = '';
        
        // Add projects to grid
        projects.forEach(project => {
          const gridItem = document.createElement('div');
          gridItem.className = 'project-card';
          gridItem.innerHTML = createProjectCard(project);
          projectsGrid.appendChild(gridItem);
        });
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cerrar';
        closeBtn.className = 'btn-primary mt-4 mx-auto block';
        closeBtn.addEventListener('click', closeProjectsGrid);
        projectsGrid.appendChild(closeBtn);
      }
    });
  }
}

// Close Projects Grid
function closeProjectsGrid() {
  // Show slider
  if (projectsSlider) projectsSlider.style.display = 'block';
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
          throw new Error('Error al enviar el mensaje');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.');
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