// Módulo de navegação responsável pelo menu mobile e submenu
export function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.style.display = isExpanded ? 'none' : 'block';
        });
    }

    // Gerenciamento dos submenus
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const submenu = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            toggle.setAttribute('aria-expanded', !isExpanded);
            submenu.hidden = isExpanded;
        });
    });
}