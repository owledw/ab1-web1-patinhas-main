# Patinhas 🐾 - Plataforma de Adoção de Animais

O **Patinhas** é um sistema web voltado para conectar animais disponíveis para adoção a potenciais adotantes conscientes no município de Penedo (AL). O projeto visa centralizar a divulgação de cães e gatos resgatados, otimizando o trabalho de ONGs e protetores independentes da região.

---

## 📌 Sobre o Projeto & Motivação

A motivação para a criação desta plataforma nasceu da vivência próxima com organizações não governamentais e protetores independentes de animais em Penedo, acompanhando a rotina ao lado da protetora **Edvania Costa** na busca por abrigar e encontrar lares seguros para animais de rua.

Um dos maiores desafios enfrentados pela causa animal local é a dependência exclusiva de redes sociais pessoais para divulgação. As restrições dos algoritmos limitam o alcance das publicações, o que resulta em:
* Superlotação de lares temporários;
* Acúmulo de custos financeiros para os protetores;
* Processos de triagem informais e pouco eficientes.

A plataforma **Patinhas** surge como uma solução digital centralizada e acessível para dar visibilidade aos animais resgatados, dar agilidade ao fluxo de adoção e conscientizar a população.

---

## 🚀 Status do Projeto e Funcionalidades

### ✅ Implementado (AB2)
- **Páginas e rotas** com `react-router-dom`: Início, Adote, Ficha do Pet, Nossa Missão, Contato e Área do Protetor.
- **Listagem com filtros:** busca pelo nome (`onChange`) e filtro por espécie (`onClick`).
- **Fichas técnicas detalhadas:** sexo, idade, porte e estado de saúde de cada pet (`/adote/:id`).
- **Formulário de triagem integrado:** o botão "Quero Adotar" abre o formulário na ficha do pet.
- **Área do Protetor:** cadastro de novos animais com pré-visualização do cartão.
- **Contato e boletim:** formulários com validação e mensagem de confirmação.
- **Componentização com props:** `Banner`, `CartaoAnimal`, `SeccaoMissao`, `FormularioTriagem`...
- **Ícones** com `react-icons` e menu responsivo para celular.
- **Banco de dados MySQL** com servidor Node/Express (pasta `server`).

### 🔮 Próximas Etapas
- **Dashboard do protetor:** acompanhar o status dos processos de adoção.
- **Seção Educativa:** conteúdos sobre posse responsável.

### ✔️ Requisitos da AB2 atendidos

| Requisito | Onde está |
|---|---|
| Página HTML inicial | `public/index.html` + `src/paginas/Home.js` |
| Dividir a página em partes | `src/componentes/*` |
| Locomoção dos componentes (Flexbox) | `src/App.css` (`display: flex`, `gap`, `flex-wrap`...) |
| Estilização em texto | Fontes Playfair/Inter, itálico, `text-transform`, `letter-spacing` |
| Estilização em imagens | `object-fit`, zoom no hover dos cartões, banners com sobreposição |
| Rotas | `src/App.js` (`BrowserRouter`, `Routes`, `Route`, `Link`) |
| Props | `Banner`, `CartaoAnimal`, `SeccaoMissao`, `FormularioTriagem` |
| React Icons | Navegação, filtros, ficha do pet, contato, rodapé |
| onChange e onClick | Busca, filtros, formulários, menu, boletim |
| useState e Renderização Condicional | Carregamento, lista vazia, formulários, menu do celular |
| Conexão com Banco de Dados | `server/index.js` + `server/banco.sql` + `src/services/api.js` |

---

## 🗂️ Estrutura de Pastas

```
server/
├── index.js       # Servidor Express + conexão MySQL + rotas
├── banco.sql      # Criação do banco e das tabelas
└── package.json
src/
├── componentes/   # Partes reutilizáveis (BarraNavegacao, Banner, CartaoAnimal, Rodape...)
├── paginas/       # Páginas completas ligadas às rotas
├── services/      # api.js — todas as requisições ao servidor/banco
├── dados/         # animais.js — dados simulados (mock) até o banco existir
├── img/
├── App.js         # Rotas
└── App.css        # Estilos globais
```

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://reactjs.org/)** — Biblioteca para construção da interface de usuário.
- **[React Router DOM](https://reactrouter.com/)** — Rotas entre as páginas.
- **[React Icons](https://react-icons.github.io/react-icons)** — Biblioteca de ícones.
- **[Axios](https://axios-http.com/)** — Requisições HTTP para o servidor.
- **[Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)** — Servidor (API).
- **[MySQL](https://www.mysql.com/)** — Banco de dados.
- **JavaScript (ES6+)** — Lógica da aplicação.
- **CSS3** — Estilização, layout responsivo com Flexbox e variáveis globais.
- **HTML5 (JSX)** — Estruturação semântica.

---

## 🗄️ Banco de Dados (MySQL)

- **`server/index.js`**: servidor Express com as rotas (`/animais`, `/solicitacoes`, `/contatos`, `/boletim`).
- **`server/banco.sql`**: cria o banco `patinhas`, as 4 tabelas e os animais iniciais.
- **`src/services/api.js`**: requisições do React para o servidor com Axios.
---

## 💻 Como Executar o Projeto

### 📋 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (versão LTS recomendada)

### 🔧 Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/owledw/ab1-web1-patinhas.git
   ```

2. **Acessar a pasta do projeto:**
   ```bash
   cd ab1-web1-patinhas
   ```

3. **Criar o banco:** abra `server/banco.sql` no MySQL Workbench e execute (⚡).

4. **Ligar o servidor** (em um terminal, com a senha do seu MySQL em `server/index.js`):
   ```bash
   cd server
   npm install
   npm run dev
   ```

5. **Ligar o site** (em outro terminal, na pasta principal):
   ```bash
   npm install
   npm start
   ```

6. **Acessar no navegador:**
   O projeto abrirá automaticamente no endereço [http://localhost:3000](http://localhost:3000).

---

## 📄 Licença e Autoria

Projeto desenvolvido para a disciplina de **Projeto Web I**.  
Inspirado e dedicado às ações de resgate e acolhimento em Penedo/AL.