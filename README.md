# Projeto — ONG Viver de Novo

Resumo rápido
- Estrutura de site estática HTML/CSS com comportamento dinâmico via JavaScript modular (ES Modules).
- Implementado SPA básico, templates, validação de formulário (verificação de CPF) e salvamento de rascunho em localStorage.

Estrutura de pastas
# Projeto — ONG Viver de Novo

Este repositório contém um site estático (HTML/CSS/JS) desenvolvido como projeto final. Este README foi atualizado para atender aos requisitos da entrega final: controle de versão profissional (Git/GitHub), conformidade com WCAG 2.1 nível AA, otimizações para produção e documentação técnica completa.

## Sumário
- Descrição do projeto
- Evidências de versionamento (GitFlow, commits semânticos, releases)
- Acessibilidade (WCAG 2.1 AA) — o que foi implementado e como testar
- Otimização para produção — minificação e compressão de imagens
- Como executar, testar e publicar (instruções para PowerShell/Windows)
- Checklist final para entrega

---

## Descrição rápida

- Projeto: site estático para uma ONG com páginas semânticas: `index.html`, `projetos.html`, `cadastro.html`.
- Funcionalidades principais: SPA leve (fetch + pushState), templates JS modulares, validação de formulário (CPF) e salvamento de rascunho em `localStorage`.

Estrutura principal (resumo):

```
assets/
  css/
    style.css
  js/
    main.js
    modules/
      formValidation.js
      navigation.js
      router.js
      templates.js
index.html
projetos.html
cadastro.html
README.md
```

## 1) Controle de versão profissional (Git / GitHub)

Contrato curto:
- Branches principais: `main` (produção), `develop` (integração).
- Features: `feature/<nome>`, Releases: `release/x.y.z`, Hotfixes: `hotfix/x.y.z`.
- Commits semânticos: `type(scope): descrição` (ex.: `feat(cadastro): validação de CPF`).

Como usar (exemplos):

- Criar branch de feature:

```powershell
git checkout -b feature/validacao-cpf
```

- Commits semânticos (exemplos):

```powershell
git add assets/js/modules/formValidation.js
git commit -m "feat(form): adicionar validação de CPF com mensagens de erro"
git commit -m "fix(form): corrigir bug no salvamento do rascunho"
git commit -m "chore(deps): atualizar dependências de build"
```

- Criar um release (exemplo semântico):

```powershell
# no branch develop
git checkout develop
git merge --no-ff feature/validacao-cpf -m "chore: merge feature/validacao-cpf"
git tag -a v1.0.0 -m "Release v1.0.0 - entrega final"
git push origin develop --tags
```

Sugestões para PRs:
- Use branch `feature/*` ou `hotfix/*` e abra PR para `develop` (ou `main` se for hotfix).
- Inclua descrição clara, checklist de QA e testes de acessibilidade realizados.
- Vincule Issues e milestones.

Evidências esperadas no repositório para entrega (ver checklist):
- Histórico de commits semântico e organizado.
- Pull Requests com descrição e checklist.
- Issues e Milestones usados para planejar e rastrear entregas.
- Tags/Release com versionamento semântico (vMAJOR.MINOR.PATCH).

---

## 2) Acessibilidade — WCAG 2.1 Nível AA (o que foi feito e como testar)

Meta: todas as páginas seguem práticas para alcançar WCAG 2.1 AA. Lista do que está implementado e como foi validado.

Principais implementações (e onde procurar/editar):

- Navegação por teclado:
  - Todos os elementos interativos usam `button`, `a` com href, ou `role="button"` + key handlers.
  - Serve como evidência: arquivo `assets/js/modules/navigation.js` gerencia foco e atalho de teclado para menus.
  - Teste: navegue usando `Tab` / `Shift+Tab` e verifique foco visual (outline claro) em links, botões e formulários.

- Skip link (pular para conteúdo):
  - Existe um link no topo que fica visível ao focar (ver `index.html`), apontando para `#main`.
  - Teste: pressione `Tab` ao abrir a página e use o link para pular o cabeçalho.

- Estrutura semântica e landmarks:
  - Uso de `<header>`, `<nav>`, `<main id="main">`, `<footer>`, `<section aria-labelledby="...">`.

- Contraste de cores:
  - Garantido contraste mínimo de 4.5:1 para texto normal nas cores principais.
  - Para verificar: use a extensão Axe ou a ferramenta WebAIM Contrast Checker.

- Suporte a leitor de tela:
  - Elementos de formulário possuem `label` associados (`for` + `id`) e `aria-describedby` quando aplicável.
  - Elementos dinâmicos (modals, toasts) usam `role` apropriado e `aria-live` para notificações importantes.

- Versões de alto contraste e modo escuro acessível:
  - Implementado suporte via CSS: classe `high-contrast` e `dark-mode` aplicáveis ao `<body>`.
  - Exemplo para ativar temporariamente (abrir console ou usar botão de toggle):

```javascript
// Ativar modo escuro
document.body.classList.add('dark-mode')
// Ativar alto contraste
document.body.classList.add('high-contrast')
```

Recomendações de testes e ferramentas:
- Extensão Axe (Chrome/Edge) — executa auditoria de acessibilidade.
- NVDA (Windows) ou VoiceOver (macOS) — testar navegação com leitor de tela.
- Lighthouse (DevTools) — runs accessibility audits.
- WebAIM Contrast Checker — medir contraste de pares de cores.

Edge cases e nota de implementação:
- Inputs dinâmicos devem preservar foco após atualização do DOM (ex.: montagens do SPA). As funções em `router.js` tentam restaurar foco para o primeiro heading do conteúdo carregado.
- Caso algum componente (ex.: dropdown custom) não esteja 100% acessível, liste-o nas Issues para correção (e vincule um milestone). Isso serve como evidência de rastreamento.

---

## 3) Otimização para produção

Objetivo: reduzir tamanho do site e otimizar imagens para deploy em ambiente de produção.

Recomendações e exemplos de pipeline (Node.js/npm):

1) `package.json` (exemplo) — adicionar como base para scripts de build:

```json
{
  "name": "projeto-ong",
  "version": "1.0.0",
  "scripts": {
    "build:html": "html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true -o dist/index.html index.html",
    "build:css": "cleancss -o dist/assets/css/style.css assets/css/style.css",
    "build:js": "terser assets/js/main.js -o dist/assets/js/main.js --compress --mangle",
    "compress:images": "imagemin assets/images/* --out-dir=dist/assets/images",
    "build": "npm run build:html && npm run build:css && npm run build:js && npm run compress:images"
  },
  "devDependencies": {
    "html-minifier-terser": "^6.0.0",
    "terser": "^5.0.0",
    "clean-css-cli": "^5.0.0",
    "imagemin-cli": "^7.0.0"
  }
}
```

Observações:
- Os comandos acima usam ferramentas conhecidas (`html-minifier-terser`, `terser`, `clean-css-cli`, `imagemin-cli`). Rode `npm install` para instalar.
- As saídas apontam para `dist/` — mantenha o diretório `dist` como artefato de build para deploy.

Como rodar (PowerShell):

```powershell
# instalar dependências
npm install

# rodar build completo
npm run build

# servir a pasta dist para teste (poderá usar python ou serve)
python -m http.server 8000 --directory dist
```

---

## 4) Como testar localmente (passos rápidos)

1. Abra PowerShell na pasta do projeto:

```powershell
cd "C:\Users\Hugoo\OneDrive\Área de Trabalho\projeto_ong"
```

2. Inicie um servidor estático para desenvolvimento:

```powershell
# Python 3
python -m http.server 8000

# Acesse http://localhost:8000
```

3. Para testar build/otimizações (opcional):

```powershell
npm install
npm run build
python -m http.server 8000 --directory dist
# Acesse http://localhost:8000
```

---

## 5) Documentação técnica e evidências (o que entregar)

No repositório público, inclua as seguintes evidências para avaliação:

1. README atualizado (este arquivo) com instruções e evidências claras.
2. Branching: use `develop` e `main` + branches `feature/*`, `release/*`, `hotfix/*`.
3. Histórico de commits semântico — coloque mensagens que expliquem o escopo (`feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`).
4. Pull Requests documentados — cada PR com checklist e referência à Issue.
5. Issues e Milestones usados para planejar as entregas (um milestone chamado `Entrega Final` é recomendado).
6. Tags de release semânticas (ex.: `v1.0.0`) no GitHub Releases.
7. Uma pequena nota em um arquivo (ou no corpo do Release) descrevendo as verificações de acessibilidade realizadas (axe, NVDA) e o resultado.

Checklist final para marcar antes de entregar:

- [ ] Repositório público no GitHub
- [ ] `README.md` completo (este arquivo)
- [ ] Branch `develop` com histórico de features e PRs para `main`/`release`
- [ ] Pelo menos 1 Release tag (`vMAJOR.MINOR.PATCH`)
- [ ] Issues/Milestones usados e vinculados em PRs
- [ ] Auditoria básica de acessibilidade (captura de tela do Axe ou relatório) anexada ao PR/Release
- [ ] `dist/` gerado com minificação (opcional: anexar build como artefato no Release)

---

## 6) Próximos passos (opcionais e recomendados)

- Implementar um pipeline CI simples (GitHub Actions) que rode lint, build e auditoria de acessibilidade (axe-core CLI) em cada PR.
- Adicionar testes unitários para funções críticas (ex.: `validateCPF`).
- Integrar um serviço de hosting (Netlify/Vercel/GitHub Pages) para deploy automático a partir de `main` e `release`.

---

## Contato

Se precisar que eu adicione scripts, CI ou implemente os ajustes de acessibilidade (ex.: corrigir componentes específicos), diga quais arquivos prefere que eu altere e eu implemento as mudanças e verifico o build.

---

*Última atualização: 2025-11-14*
