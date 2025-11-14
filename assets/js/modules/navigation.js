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
        const submenu = toggle.nextElementSibling;

        // click/tap
        toggle.addEventListener('click', (e) => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            if (submenu) submenu.hidden = isExpanded;

            // quando abrir, mover foco para o primeiro link do submenu
            if (!isExpanded && submenu) {
                const firstLink = submenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });

        // keyboard support: Enter, Space to toggle; Escape to close
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            } else if (e.key === 'Escape') {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    toggle.setAttribute('aria-expanded', 'false');
                    if (submenu) submenu.hidden = true;
                    toggle.focus();
                }
            }
        });
    });
}