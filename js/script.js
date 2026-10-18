/**
 * Arquitectura de JavaScript Modular
 * Cumple con principios de código limpio y control del usuario (Heurísticas 1 y 3)
 */

const PortfolioApp = {
    // Inicialización de la lógica
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.initTheme();
        this.initScrollAnimations();
    },

    // Caché de elementos del DOM para evitar consultas repetitivas (Eficiencia)
    cacheDOM() {
        this.htmlDoc = document.documentElement;
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.iconMoon = document.getElementById('icon-moon');
        this.downloadBtn = document.getElementById('download-cv');
        this.toastEl = document.getElementById('toast');
        this.fadeElements = document.querySelectorAll('.fade-in');
    },

    // Enlace de eventos (Event Listeners)
    bindEvents() {
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.handleDownloadCV());
        }
    },

    // Gestión del Modo Claro/Oscuro (Flexibilidad y control del usuario)
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        // Preferencia por defecto del sistema
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    },

    setTheme(themeName) {
        this.htmlDoc.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
        this.updateThemeIcon(themeName);
    },

    toggleTheme() {
        const currentTheme = this.htmlDoc.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.showToast(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
    },

    // Actualiza el SVG del botón de tema dependiendo del modo
    updateThemeIcon(theme) {
        if (theme === 'dark') {
            // Icono de Sol para regresar a modo claro
            this.iconMoon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        } else {
            // Icono de Luna para ir a modo oscuro
            this.iconMoon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        }
    },

    // Animaciones de Aparición al hacer Scroll (Interactividad elegante)
    initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // El elemento aparecerá cuando el 15% sea visible
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); // Dejamos de observar una vez que ya apareció
                }
            });
        }, observerOptions);

        this.fadeElements.forEach(el => observer.observe(el));
    },

    // Lógica para descargar el CV
    handleDownloadCV() {
        // Aquí iría la lógica real (ej. window.open('ruta/al/cv.pdf', '_blank'))
        this.showToast('Iniciando la descarga del CV...');
    },

    // Visibilidad del Estado del Sistema (Heurística 1)
    showToast(message) {
        this.toastEl.textContent = message;
        this.toastEl.classList.add('show');
        
        // Limpiar timeout anterior si existe
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
        
        // Ocultar después de 3 segundos
        this.toastTimeout = setTimeout(() => {
            this.toastEl.classList.remove('show');
        }, 3000);
    }
};

// Arrancar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    PortfolioApp.init();
});