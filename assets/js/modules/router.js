// Módulo de roteamento para SPA
export function initializeRouter() {
    // Estado do router
    const state = {
        currentPage: window.location.pathname
    };

    // Handler para navegação: trata âncoras internas, links relativos e páginas .html
    function handleNavigation(e) {
        const anchor = e.target.closest && e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href) return;

        // Links que são apenas hashes -> rolar para a seção na página atual
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Atualiza o hash no histórico
                window.history.pushState({}, '', '#' + id);
            }
            return;
        }

        // Detectar se é um link externo (tem protocolo diferente ou host diferente)
        try {
            const url = new URL(anchor.href, window.location.href);
            const isExternal = url.origin !== window.location.origin && window.location.protocol !== 'file:';
            if (isExternal) {
                // deixa o comportamento padrão para links externos
                return;
            }

            // Se for um link para um arquivo .html ou rota interna, usar o SPA
            if (url.pathname.endsWith('.html') || url.pathname === '/' ) {
                e.preventDefault();
                const path = url.pathname.replace(/^\//, '') || 'index.html';
                const hash = url.hash || '';
                navigateTo(path, hash);
            }
        } catch (err) {
            // Se new URL falhar (por exemplo em ambientes estranhos), deixa o default
            console.error('Erro ao processar link:', err);
        }
    }

    // Função de navegação: path é algo como 'projetos.html' ou 'index.html'; hash opcional '#id'
    async function navigateTo(path, hash = '') {
        // Evita recarregar a mesma página
        if (state.currentPage.endsWith(path)) {
            // Ainda assim, se houver hash, rola para a seção
            if (hash) {
                const id = hash.replace('#', '');
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }

        try {
            const fetchUrl = path;
            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error('Falha ao carregar: ' + fetchUrl);
            const html = await response.text();

            // Extrair o conteúdo principal
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainEl = doc.querySelector('main');
            if (!mainEl) throw new Error('Arquivo sem <main>:' + fetchUrl);
            const mainContent = mainEl.innerHTML;

            // Atualizar o conteúdo
            const hostMain = document.querySelector('main');
            hostMain.innerHTML = mainContent;

            // Atualizar título e meta description
            document.title = doc.title || document.title;
            const metaDesc = doc.querySelector('meta[name="description"]');
            if (metaDesc) {
                const hostMeta = document.querySelector('meta[name="description"]');
                if (hostMeta) hostMeta.setAttribute('content', metaDesc.getAttribute('content'));
            }

            // Atualizar URL (mantém o hash se houver)
            const newUrl = '/' + path + (hash || '');
            window.history.pushState({}, '', newUrl);
            state.currentPage = '/' + path;

            // Reinicializar módulos necessários da página carregada
            initializePageModules();

            // Se houver hash, rolar para o elemento após um pequeno timeout para garantir renderização
            if (hash) {
                const id = hash.replace('#', '');
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 80);
            }
        } catch (error) {
            console.error('Erro ao navegar:', error);
            // fallback: navegar com a url normal
            window.location.href = path + (hash || '');
        }
    }

    // Função para inicializar módulos específicos da página
    function initializePageModules() {
        // Reinicializar validação de formulário se estiver na página de cadastro
        if (document.getElementById('cadastro-form')) {
            import('./formValidation.js').then(module => {
                if (module && module.initializeFormValidation) module.initializeFormValidation();
            }).catch(err => console.error(err));
        }

        // Inicializa templates/modais novamente (botões 'Saiba mais' etc.)
        if (document.querySelectorAll('[data-modal-title]').length) {
            import('./templates.js').then(module => {
                if (module && module.initializeTemplates) module.initializeTemplates();
            }).catch(err => console.error(err));
        }
    }

    // Listeners
    document.addEventListener('click', handleNavigation);
    window.addEventListener('popstate', () => {
        // Ao voltar/avançar, recarrega a rota atual
        const path = window.location.pathname.replace(/^\//, '') || 'index.html';
        const hash = window.location.hash || '';
        navigateTo(path, hash);
    });
}