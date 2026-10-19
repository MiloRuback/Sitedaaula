# Sistema de Cadastros – CRUD + Supabase
**Nome escolar: Milo**

## Arquivos do projeto
- `index.html` → página principal
- `style.css` → estilos
- `script.js` → lógica do CRUD + conexão com Supabase
- `sql-criar-tabela.sql` → código SQL pronto para colar no Supabase

---

## Como configurar (passo a passo)

### 1. Criar o projeto no Supabase
1. Acesse https://supabase.com e faça login
2. Clique em **New Project**
3. Escolha/crie uma Organization
4. Preencha nome do projeto, senha do banco e região
5. Aguarde a criação

### 2. Criar a tabela e as policies
1. No menu lateral → **SQL Editor** → **New query**
2. Abra o arquivo `sql-criar-tabela.sql` e copie **todo** o conteúdo
3. Cole no editor e clique em **Run**

### 3. Pegar as chaves
1. Menu lateral → **Project Settings** (engrenagem)
2. Aba **API**
3. Copie:
   - **Project URL**
   - **anon public** key

### 4. Colocar as chaves no código
Abra o arquivo `script.js` e substitua:

```js
const SUPABASE_URL = 'COLE_AQUI_A_URL_DO_SEU_PROJETO';
const SUPABASE_ANON_KEY = 'COLE_AQUI_A_CHAVE_ANON_PUBLIC';
```

---

## Como colocar no Vercel (mais fácil)

### Opção A – Arrastar e soltar (mais rápida, sem Git)

1. Acesse [https://vercel.com](https://vercel.com) e faça login (pode usar GitHub ou email)
2. Clique em **Add New… → Project**
3. Em vez de conectar repositório, clique em **“Browse all templates”** ou procure a opção de **upload**
4. Ou use este caminho mais simples:
   - Vá em [https://vercel.com/new](https://vercel.com/new)
   - Role até a parte de baixo e clique em **“Deploy from a local directory”** ou use o comando abaixo

**Forma mais fácil mesmo:**

1. Entre em [https://vercel.com](https://vercel.com)
2. Clique em **Add New Project**
3. Escolha **Import** e depois use a opção de arrastar a pasta
4. Se não aparecer a opção de drag & drop, faça assim:

### Forma recomendada (com GitHub – muito fácil)

1. Crie uma conta no [GitHub](https://github.com) (se ainda não tiver)
2. Crie um repositório novo (pode ser privado ou público)
3. Faça upload dos 4 arquivos (`index.html`, `style.css`, `script.js` e `sql-criar-tabela.sql`)
4. Volte no Vercel → **Add New Project** → **Import** o repositório do GitHub
5. Clique em **Deploy**

Pronto! O Vercel vai te dar um link tipo:
`https://seu-projeto.vercel.app`

### Opção ainda mais rápida (sem Git)

1. Vá em [https://vercel.com/new](https://vercel.com/new)
2. Clique em **“Continue with GitHub”** ou faça login
3. Depois de logado, procure a opção **“Deploy”** e arraste a pasta `site-crud-milo` inteira
4. Ou use o site [https://app.netlify.com/drop](https://app.netlify.com/drop) (Netlify Drop) se preferir – é só arrastar a pasta e pronto.

---

## Depois de subir no Vercel

- Abra o link que o Vercel te deu
- Teste criar, editar e excluir cadastros
- Mostre pro professor o link funcionando

---

## Funcionalidades implementadas
- **Create** → formulário de novo cadastro
- **Read** → listagem em tabela
- **Update** → botão Editar preenche o formulário
- **Delete** → botão Excluir com confirmação

Tema: Sistema de Cadastros (livre e bem alinhado com o exemplo da aula).
