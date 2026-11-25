# 🗄️ Passo a passo: conectando o Patinhas ao MySQL

Este guia segue o que foi visto nas Aulas 12, 13 e 14 (Server e MySQL Connection, Requisição e Create, Read).

## Como as partes se conversam

```
React (porta 3000)                    Server (porta 3001)              MySQL
src/paginas/*.js                      server/index.js                  banco "patinhas"
   │  chama                              │                                │
   ▼                                     │                                │
src/services/api.js ── Axios.get/post ──▶ app.get / app.post ── db.query ─▶ tabelas
                     ◀────── res.send(result) ◀──────────── result ──────┘
```

- As **páginas e componentes não falam com o banco**. Eles chamam funções de `src/services/api.js`.
- O `api.js` faz a requisição com **Axios** para o servidor.
- O **servidor** (`server/index.js`) recebe a requisição, roda o **SQL** e devolve o resultado.

---

## Passo 1 — Instalar o MySQL

1. Baixe e instale o **MySQL Installer**: https://dev.mysql.com/downloads/installer/
2. Em *Choosing a Setup Type*, escolha **Developer Default** (ou *Custom* com **MySQL Server** + **MySQL Workbench**).
3. Em *Accounts and Roles*, defina a senha do usuário **root**. **Anote essa senha.**
4. Termine a instalação e abra o **MySQL Workbench**. Clique na conexão *Local instance* e digite a senha.

## Passo 2 — Criar o banco e as tabelas

1. No Workbench, vá em **File → Open SQL Script...** e abra o arquivo `server/banco.sql`.
2. Clique no **raio ⚡** (*Execute*) para rodar o script inteiro.
3. No painel *Schemas* à esquerda, clique no ícone de atualizar 🔄. O banco **patinhas** vai aparecer com 4 tabelas:

| Tabela | Para que serve | Tela que usa |
|---|---|---|
| `animais` | Animais para adoção (já vem com 6 cadastrados) | Início, Adote, Ficha do Pet, Cadastrar Pet |
| `solicitacoes` | Pedidos do formulário "Quero Adotar" | Ficha do Pet |
| `contatos` | Mensagens enviadas | Contato |
| `boletim` | Emails inscritos | Rodapé |

4. Para conferir: `SELECT * FROM patinhas.animais;` deve mostrar Luna, Max, Milo, Thor, Mel e Pipoca.

> ⚠️ O `banco.sql` **apaga e recria** as tabelas. Rode só uma vez (ou quando quiser zerar tudo).

## Passo 3 — Configurar a senha no servidor

Abra `server/index.js` e troque o usuário e a senha pelos do **seu** MySQL (a senha do Passo 1):

```js
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",   // <-- coloque a SUA senha aqui
  database: "patinhas",
  charset: "utf8mb4",
});
```

## Passo 4 — Instalar as bibliotecas do servidor

Abra um terminal **dentro da pasta `server`** e rode:

```bash
cd server
npm install
```

Isso instala o que está no `server/package.json`: **express**, **mysql2**, **cors** e **nodemon** (os mesmos da Aula 12).

> Por que `mysql2` e não `mysql`? O uso é **idêntico** (`createPool`, `db.query`), mas o pacote `mysql` antigo não aceita o login padrão do MySQL 8 e dá o erro `ER_NOT_SUPPORTED_AUTH_MODE`. O `mysql2` evita esse problema.

## Passo 5 — Ligar o servidor

Ainda na pasta `server`:

```bash
npm run dev
```

Deve aparecer: `rodando servidor na porta 3001`. **Deixe esse terminal aberto.**

Teste no navegador: abra http://localhost:3001/animais. Se aparecer uma lista em JSON com os animais, a conexão com o banco está funcionando. ✅

## Passo 6 — Ligar o site (React)

Abra **outro terminal** na pasta principal do projeto (fora da `server`):

```bash
npm install
npm start
```

O site abre em http://localhost:3000 e agora usa o banco de verdade, porque em `src/services/api.js` está:

```js
const USAR_MOCK = false;
```

> 💡 Se precisar apresentar o site **sem** o MySQL ligado, troque para `true`: ele volta a usar os dados de `src/dados/animais.js`.

## Passo 7 — Testar cada fluxo

| Faça no site | Confira no Workbench |
|---|---|
| Página **Adote** lista os animais | `SELECT * FROM animais;` (Read) |
| **Cadastrar Pet** → preencha → Cadastrar | `SELECT * FROM animais;` → novo animal no fim (Create) |
| Ficha do pet → **Quero Adotar** → Enviar pedido | `SELECT * FROM solicitacoes;` |
| **Contato** → Enviar | `SELECT * FROM contatos;` |
| Rodapé → **Inscrever-se** | `SELECT * FROM boletim;` |

---

## Rotas do servidor

| Método | Rota | SQL | Função no `api.js` |
|---|---|---|---|
| GET | `/animais` | `SELECT * FROM animais WHERE disponivel = 1` | `listarAnimais()` |
| GET | `/animais/:id` | `SELECT * FROM animais WHERE id = ?` | `buscarAnimalPorId(id)` |
| POST | `/animais` | `INSERT INTO animais (...) VALUES (...)` | `cadastrarAnimal(animal)` |
| POST | `/solicitacoes` | `INSERT INTO solicitacoes (...)` | `enviarSolicitacaoAdocao(dados)` |
| POST | `/contatos` | `INSERT INTO contatos (...)` | `enviarContato(dados)` |
| POST | `/boletim` | `INSERT IGNORE INTO boletim (email)` | `inscreverBoletim(email)` |

Os `?` no SQL são preenchidos pelo array em `db.query(SQL, [valores], ...)`. Isso protege o banco contra *SQL Injection*.

## Exemplo completo: como o Cadastrar Pet chega ao banco

**1. Página** (`src/paginas/CadastroAnimal.js`): `onChange` guarda o que foi digitado e `onClick` chama a função:

```js
const handleClickButton = () => {
  cadastrarAnimal(values).then((novoAnimal) => setAnimalSalvo(novoAnimal));
};
```

**2. Requisição** (`src/services/api.js`): Axios envia para o servidor:

```js
return Axios.post(`${URL_SERVIDOR}/animais`, animal).then((response) => response.data);
```

**3. Servidor** (`server/index.js`): recebe e grava no MySQL:

```js
app.post("/animais", (req, res) => {
  const { nome, especie, tipo, sexo, idade, porte, saude, imagem, descricao } = req.body;
  let SQL = "INSERT INTO animais ( nome, especie, ... ) VALUES ( ?, ?, ... )";
  db.query(SQL, [nome, especie, ...], (err, result) => {
    res.send({ id: result.insertId, ...req.body });
  });
});
```

---

## Problemas comuns

| Erro / sintoma | Causa | Solução |
|---|---|---|
| `Access denied for user 'root'@'localhost'` | Senha errada no `server/index.js` | Corrija `password` (Passo 3) |
| `Unknown database 'patinhas'` | Script não foi rodado | Rode o `banco.sql` (Passo 2) |
| `ECONNREFUSED 127.0.0.1:3306` | MySQL desligado | Inicie o serviço MySQL (Windows: *Serviços → MySQL80 → Iniciar*) |
| Site mostra "Não foi possível carregar os animais" | Servidor desligado | Rode `npm run dev` na pasta `server` (Passo 5) |
| `EADDRINUSE :::3001` | Servidor já está aberto em outro terminal | Feche o outro terminal ou use o que já está rodando |
| Acentos aparecem estranhos (`FÃªmea`) | Banco criado com outra codificação | Rode o `banco.sql` de novo (ele usa `utf8mb4`) |
| `'nodemon' não é reconhecido` | Faltou instalar no server | `cd server` e `npm install` |
