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
});