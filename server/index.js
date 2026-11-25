// Servidor do Patinhas (Aula 12): Express + MySQL + CORS
// Rodar: npm run dev (dentro da pasta server)
// =====================================================================

// Carregar módulos
const express = require("express");
const app = express();
const mysql = require("mysql2"); // mesma forma de uso do "mysql" visto em aula
const cors = require("cors");

// Conexão com a base de dados
// >>> Troque "user" e "password" pelos dados do SEU MySQL <<<
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "patinhas",
  charset: "utf8mb4", // acentos (ç, ã, é...)
});

// Permite requisições do React (outro endereço) e o envio de JSON
app.use(cors());
app.use(express.json());


// ---------------------------------------------------------------------
// ANIMAIS
// ---------------------------------------------------------------------

// READ — lista de animais disponíveis (página Adote e Início)
app.get("/animais", (req, res) => {
  let SQL = "SELECT * FROM animais WHERE disponivel = 1 ORDER BY id";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ erro: "Erro ao buscar os animais." });
    }
    res.send(result);
  });
});

// READ — um animal pelo id (Ficha do Pet)
app.get("/animais/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "SELECT * FROM animais WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ erro: "Erro ao buscar o animal." });
    }
    // Se não existir, devolve null (o React mostra "Animal não encontrado")
    res.send(result[0] || null);
  });
});

// CREATE — cadastro de animal (Área do Protetor)
app.post("/animais", (req, res) => {
  const { nome, especie, tipo, sexo, idade, porte, saude, imagem, descricao } = req.body;

  if (!nome || !especie || !descricao) {
    return res.status(400).send({ erro: "Nome, espécie e descrição são obrigatórios." });
  }

  let SQL = "INSERT INTO animais ( nome, especie, tipo, sexo, idade, porte, saude, imagem, descricao ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";

  db.query(SQL, [nome, especie, tipo, sexo, idade, porte, saude, imagem, descricao], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ erro: "Erro ao cadastrar o animal." });
    }
    // Devolve o animal com o id gerado pelo banco (o React usa para o link "Ver ficha")
    res.send({ id: result.insertId, ...req.body, disponivel: 1 });
  });
});


// ---------------------------------------------------------------------
// SOLICITAÇÕES DE ADOÇÃO (formulário "Quero Adotar")
// ---------------------------------------------------------------------
app.post("/solicitacoes", (req, res) => {
  const { idAnimal, nome, email, telefone, moradia, temOutrosAnimais, motivo } = req.body;

  if (!idAnimal || !nome || !email || !telefone || !moradia) {
    return res.status(400).send({ erro: "Preencha os campos obrigatórios." });
  }

  let SQL = "INSERT INTO solicitacoes ( id_animal, nome, email, telefone, moradia, tem_outros_animais, motivo ) VALUES ( ?, ?, ?, ?, ?, ?, ? )";

  db.query(SQL, [idAnimal, nome, email, telefone, moradia, temOutrosAnimais, motivo], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ erro: "Erro ao enviar a solicitação." });
    }
    res.send({ sucesso: true, id: result.insertId });
  });
});


// ---------------------------------------------------------------------
// CONTATOS (página Contato)
// ---------------------------------------------------------------------
app.post("/contatos", (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).send({ erro: "Preencha todos os campos." });
  }

  let SQL = "INSERT INTO contatos ( nome, email, mensagem ) VALUES ( ?, ?, ? )";

  db.query(SQL, [nome, email, mensagem], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ erro: "Erro ao enviar a mensagem." });
    }
    res.send({ sucesso: true, id: result.insertId });
  });
});


// ---------------------------------------------------------------------
// BOLETIM (rodapé)
// ---------------------------------------------------------------------
app.post("/boletim", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ erro: "Informe o email." });
  }

  // INSERT IGNORE: se o email já estiver inscrito, não dá erro
  let SQL = "INSERT IGNORE INTO boletim ( email ) VALUES ( ? )";

  db.query(SQL, [email], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ erro: "Erro ao inscrever o email." });
    }
    res.send({ sucesso: true });
  });
});


// Ativar a porta de envio de dados
app.listen(3001, () => {
  console.log("rodando servidor na porta 3001");
});
