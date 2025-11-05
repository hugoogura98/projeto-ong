# Projeto — ONG Viver de Novo

Resumo rápido
- Estrutura de site estática HTML/CSS com comportamento dinâmico via JavaScript modular (ES Modules).
- Implementado SPA básico, templates, validação de formulário (verificação de CPF) e salvamento de rascunho em localStorage.

Estrutura de pastas

```
projeto/
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ images/
│  └─ js/
│     ├─ main.mjs            # entrypoint (ES module)
│     ├─ app.js              # legacy/compat (opcional)
│     └─ modules/
│        ├─ ui.js            # helpers: DOM, toast, modal
│        ├─ templates.js     # small template registry
│        ├─ forms.js         # form validation, CPF, draft save
│        └─ router.js        # SPA router, link hijack, render cycle
├─ index.html
├─ projetos.html
├─ cadastro.html
└─ README.md
```

O que foi implementado (requisitos)
- SPA básico: navegação interna carrega o conteúdo do `<main id="main">` via fetch + pushState.
- Sistema de templates: `assets/js/modules/templates.js` com função `renderTemplate`.
- Validação de formulário:
  - Validação de CPF (algoritmo oficial básico) e destaque visual de campos inválidos.
  - Salvamento automático de rascunho no `localStorage` (chave `cadastro:draft:v1`) com restauração ao recarregar a página.
  - Mensagens para o usuário via toasts e mensagens inline (`.cpf-hint`).
- Código JavaScript modular: separados por responsabilidade em `assets/js/modules` e carregados por `assets/js/main.mjs` como ES modules.

Como testar localmente
1. Abra um terminal na pasta `projeto`.
2. Inicie um servidor estático (os navegadores bloqueiam fetch em `file://`):

```powershell
# Python 3
python -m http.server 8000

# Ou, se preferir, use outra ferramenta de servidor estático
```

3. Acesse `http://localhost:8000/index.html`.
4. Testes principais:
   - Clique nos links do menu — o conteúdo do `<main>` deve ser carregado sem reload completo.
   - Na página de cadastro, preencha alguns campos — o rascunho será salvo automaticamente.
   - Teste CPF inválido/valido — a validação destacará o campo e mostrará um toast.
   - Botões com `data-modal-title` abrem modal.

Como publicar no GitHub (passos rápidos)
1. Crie um novo repositório público no GitHub.
2. No seu diretório `projeto`, inicialize git, adicione e envie para o remoto:

```powershell
git init
git add .
git commit -m "Versão com SPA modular e validação de formulários"
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git branch -M main
git push -u origin main
```

3. Depois de enviado, compartilhe o link público do repositório (ex.: `https://github.com/SEU_USUARIO/NOME_DO_REPO`).

Observações e próximos passos sugeridos
- Podemos adicionar testes unitários para `validateCPF`.
- Integrar ViaCEP para autocomplete de endereço (posso adicionar agora se desejar).
- Persistir submissões simuladas (histórico) em IndexedDB/localStorage.
# Projeto ONG Exemplo

Site estático de exemplo para uma plataforma de ONGs. Contém 3 páginas semânticas: `index.html`, `projetos.html`, `cadastro.html`.

Principais pontos:

- HTML5 semântico, landmarks e acessibilidade básica.
- CSS mobile-first em `assets/css/style.css`.
- Script em `assets/js/main.js` atualiza ano, adiciona máscaras para CPF/telefone/CEP e validação leve do formulário.
- Imagens placeholders estão em `assets/images/` como data-URI SVG.

Imagens adicionadas:

- `assets/images/reuniao.jpg` — foto de reunião comunitária (adicionada a Galeria)
- `assets/images/drogas.jpg` — foto usada na seção de prevenção/encaminhamento
- `assets/images/pobreza.jpg` — foto de acolhimento/redução de danos
- `assets/images/logo.svg` — logotipo simples usado no cabeçalho

Como usar:

1. Abra `index.html` no navegador (duplo-clique no arquivo ou `Ctrl+O`).
2. Navegue até `cadastro.html` e teste o formulário com mascaramento e validação.

Observações e próximos passos sugeridos:

- Substituir imagens por fotos reais (otimizadas).
- Implementar back-end para envio real do formulário e gestão de projetos/doações.
- Adicionar testes de acessibilidade e otimização de performance (CI).

Acessibilidade e testes rápidos:

- O projeto inclui um link "Pular para o conteúdo" visível ao focar (teclado).
- Teste de formulário: abra `cadastro.html`, preencha os campos (CPF, telefone, CEP) para ver as máscaras e envie para ver a simulação.

Atualizações recentes:

- Cabeçalho atualizado com logotipo no canto superior esquerdo e menu móvel.
- Páginas `index.html` e `projetos.html` receberam novas seções (Equipe, Conquistas, Galeria).
- Foram adicionadas figuras de equipe em `index.html`, banners responsivos em `projetos.html` e uma ilustração ao lado do formulário em `cadastro.html`.

- Implementado um design system básico em `assets/css/style.css` com:
	- Paleta de cores (8 tokens), tipografia com 5 tamanhos, sistema de espaçamento modular (8/16/24/32/48/64px).
	- Grid responsivo e 5 breakpoints; sistema de cards, botões, badges, alerts, toasts e modais.
	- Navegação com submenu dropdown e menu móvel (hamburger).

Contribuição: fique à vontade para adaptar estrutura e estilos.
