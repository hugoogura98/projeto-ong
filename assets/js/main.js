// Importação dos módulos
import { initializeNavigation } from './modules/navigation.js';
import { initializeFormValidation } from './modules/formValidation.js';
import { initializeTemplates } from './modules/templates.js';
import { initializeRouter } from './modules/router.js';

// Inicialização dos módulos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeFormValidation();
    initializeTemplates();
    initializeRouter();
    
    // Atualiza o ano no footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Inicializa toggles de acessibilidade (modo escuro / alto contraste)
    function initAccessibilityToggles() {
        const darkBtn = document.getElementById('toggle-dark');
        const contrastBtn = document.getElementById('toggle-contrast');
        const body = document.body;

        // Ler preferências salvas
        const prefDark = localStorage.getItem('pref:dark') === 'true';
        const prefContrast = localStorage.getItem('pref:contrast') === 'true';

        if (prefDark) {
            body.classList.add('dark-mode');
        }
        if (prefContrast) {
            body.classList.add('high-contrast');
        }

        if (darkBtn) {
            darkBtn.setAttribute('aria-pressed', prefDark);
            darkBtn.addEventListener('click', () => {
                const active = body.classList.toggle('dark-mode');
                darkBtn.setAttribute('aria-pressed', active);
                localStorage.setItem('pref:dark', active);
            });
        }

        if (contrastBtn) {
            contrastBtn.setAttribute('aria-pressed', prefContrast);
            contrastBtn.addEventListener('click', () => {
                const active = body.classList.toggle('high-contrast');
                contrastBtn.setAttribute('aria-pressed', active);
                localStorage.setItem('pref:contrast', active);
            });
        }
    }

    initAccessibilityToggles();
});