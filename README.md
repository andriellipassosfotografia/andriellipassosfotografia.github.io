# Andrielli Passos Fotografia — site

Site estático (HTML + CSS + JS puro), sem dependências e sem build. Pronto para o GitHub Pages.

```
index.html                 → a página inteira
assets/css/style.css       → estilos
assets/js/main.js          → menu, filtros, visualizador de fotos, formulário
assets/img/full/           → fotos em alta (usadas no visualizador)
assets/img/thumb/          → versões leves (usadas na galeria)
assets/img/favicon.svg     → ícone da aba
.nojekyll                  → evita o GitHub processar o site como Jekyll
```

---

## 1. Publicar no GitHub Pages (caminho mais simples, tudo pelo navegador)

1. Crie uma conta em <https://github.com> (ideal criar uma para a cliente, ou usar a sua).
2. Clique em **+ → New repository**.
   - **Repository name:** `andriellipassos` (ou `andrielli-passos-fotografia`)
   - Marque **Public**
   - Não marque nada de README/gitignore
   - **Create repository**
3. Na tela do repositório vazio, clique em **uploading an existing file**.
4. Arraste **o conteúdo** da pasta do projeto — o `index.html` precisa ficar na **raiz** do repositório, não dentro de outra pasta. Arraste o arquivo `index.html`, a pasta `assets` e o `.nojekyll` juntos.
5. Escreva "primeira versão do site" em **Commit changes** e confirme.
6. Vá em **Settings → Pages**.
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` e pasta `/ (root)` → **Save**
7. Espere 1–2 minutos e recarregue a página. O endereço aparece no topo:
   `https://SEU-USUARIO.github.io/andriellipassos/`

> Se quiser o endereço curto `https://SEU-USUARIO.github.io` (sem o nome do projeto no fim),
> o repositório precisa se chamar exatamente `SEU-USUARIO.github.io`.

### Alternativa pelo terminal (Git)

```bash
cd caminho/para/andrielli-passos
git init
git add .
git commit -m "primeira versão do site"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/andriellipassos.git
git push -u origin main
```

Depois faça o passo 6 acima. Nas próximas alterações:

```bash
git add .
git commit -m "descrição do que mudou"
git push
```

O site atualiza sozinho ~1 minuto depois do push.

## 2. Domínio próprio (ex.: `andriellipassos.com.br`)

O GitHub Pages **não vende domínio** — ele só hospeda. Comprando o domínio (Registro.br, Hostinger, GoDaddy):

1. No painel do domínio, crie os registros DNS:
   - 4 registros `A` para `@` apontando para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro `CNAME` para `www` apontando para `SEU-USUARIO.github.io`
2. No GitHub: **Settings → Pages → Custom domain**, digite o domínio e salve.
3. Marque **Enforce HTTPS** (aparece depois que o DNS propaga, pode levar algumas horas).

## 3. O que ainda precisa ser preenchido

Todos os pontos abaixo estão marcados no `index.html` com o comentário `<!-- TROCAR: ... -->`.
Procure por `TROCAR` e por `[` no arquivo.

- [ ] Cidade / região de atendimento (hero e contato)
- [ ] Número de WhatsApp — em **dois lugares**: o link `https://wa.me/5500000000000` e o atributo `data-fone="5500000000000"` do botão do formulário. Formato: `55` + DDD + número, só dígitos.
- [ ] Endereço do estúdio
- [ ] Texto do "Sobre" revisado pela Andrielli (o atual é um rascunho)
- [ ] Foto da própria Andrielli na seção "Sobre"
- [ ] Prazo de entrega das fotos (seção "Como funciona", passo 4)
- [ ] Pacotes e valores da seção "Investimento" (a partir do PDF de orçamento)
- [ ] Depoimentos reais, com nome autorizado

## 4. Adicionar novas fotos

1. Salve a foto em `assets/img/full/` e uma versão menor com o mesmo nome em `assets/img/thumb/`
   (recomendado: lado maior de 1400px na `full` e 760px na `thumb`, qualidade 80–85%).
2. Copie um bloco `<figure class="foto">` dentro de `<div class="galeria">` e ajuste:
   - `data-cat` → uma ou mais categorias separadas por espaço: `gestante`, `primeiro-ano`, `infantil`, `quinze`, `feminino`, `familia`
   - `data-full` → caminho da imagem em alta
   - `data-legenda` → legenda que aparece no visualizador
   - `src` do `<img>` → caminho da miniatura, e o `alt` descrevendo a foto
   - se a foto for horizontal, acrescente a classe `larga`: `<figure class="foto larga" ...>`

## 5. Formulário de contato

O site é estático, então não existe servidor para receber e-mail. O formulário monta a mensagem
e abre o **WhatsApp** ou o **app de e-mail** da pessoa — funciona bem e não custa nada.

Se um dia quiserem receber os contatos por e-mail automaticamente, dá para plugar
[Formspree](https://formspree.io) ou [Getform](https://getform.io) (plano grátis) sem mudar o layout.

## 6. Testar no computador antes de publicar

Abrir o `index.html` com dois cliques já funciona. Para ficar igual ao servidor:

```bash
cd andrielli-passos
python3 -m http.server 8000
# abrir http://localhost:8000
```
