// Módulo de templates para SPA
export function initializeTemplates() {
    // Cache de templates
    const templateCache = {};

    // Função para carregar template
    async function loadTemplate(templateId) {
        if (templateCache[templateId]) {
            return templateCache[templateId];
        }

        try {
            const response = await fetch(`templates/${templateId}.html`);
            const template = await response.text();
            templateCache[templateId] = template;
            return template;
        } catch (error) {
            console.error('Erro ao carregar template:', error);
            return '';
        }
    }

    // Função para renderizar template com dados
    window.renderTemplate = async (templateId, data = {}) => {
        const template = await loadTemplate(templateId);
        return template.replace(/\${(\w+)}/g, (_, key) => data[key] || '');
    };

    // Função para carregar modais dinamicamente
    const modalButtons = document.querySelectorAll('[data-modal-title]');
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-modal-title');
            const content = button.getAttribute('data-modal-content');
            showModal(title, content);
        });
    });
}

// Função para mostrar modal
function showModal(title, content) {
    const modalHtml = `
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modal-title">
                <h2 id="modal-title">${title}</h2>
                <div class="modal-content">${content}</div>
                <button class="btn btn-primary modal-close">Fechar</button>
            </div>
        </div>
    `;

    const modalRoot = document.getElementById('modal-root');
    modalRoot.innerHTML = modalHtml;
    modalRoot.setAttribute('aria-hidden', 'false');

    const closeButton = modalRoot.querySelector('.modal-close');
    const backdrop = modalRoot.querySelector('.modal-backdrop');

    const closeModal = () => {
        modalRoot.innerHTML = '';
        modalRoot.setAttribute('aria-hidden', 'true');
    };

    closeButton.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
    });
}