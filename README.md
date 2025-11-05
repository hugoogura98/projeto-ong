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
