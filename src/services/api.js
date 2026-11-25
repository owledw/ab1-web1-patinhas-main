import Axios from "axios";
import animaisMock from "../dados/animais";

// PONTO DE INTEGRAÇÃO COM O BANCO DE DADOS
// Todas as telas do site buscam e enviam dados SOMENTE por este arquivo.
//
// USAR_MOCK = false -> usa o servidor da pasta "server" (MySQL).
//                      O servidor precisa estar rodando: cd server && npm run dev
// USAR_MOCK = true  -> usa os dados simulados de src/dados/animais.js
//                      (útil para apresentar o site sem o banco ligado).
//
// As requisições com Axios seguem o formato visto em aula.
// Passo a passo completo em PASSO_A_PASSO_BANCO.md.


const USAR_MOCK = false;
const URL_SERVIDOR = "http://localhost:3001";

// Cópia local para o mock conseguir "salvar" novos animais na sessão
let listaMock = [...animaisMock];

// Simula o tempo de resposta do servidor
const simularResposta = (dados) =>
  new Promise((resolve) => setTimeout(() => resolve(dados), 300));


// READ — lista de animais disponíveis
// Rota esperada no server: app.get("/animais", ...)
// Resposta esperada: array de objetos com os campos de src/dados/animais.js
export const listarAnimais = () => {
  if (USAR_MOCK) {
    return simularResposta(listaMock.filter((animal) => animal.disponivel));
  }
  return Axios.get(`${URL_SERVIDOR}/animais`).then((response) => response.data);
};


// READ — um animal pelo id (página de detalhes)
// Rota esperada no server: app.get("/animais/:id", ...)
// Resposta esperada: um objeto do animal (ou vazio, se não existir)
export const buscarAnimalPorId = (id) => {
  if (USAR_MOCK) {
    const animal = listaMock.find((item) => item.id === Number(id));
    return simularResposta(animal || null);
  }
  return Axios.get(`${URL_SERVIDOR}/animais/${id}`).then((response) => response.data || null);
};


// CREATE — cadastro de um novo animal (Área do Protetor)
// Rota esperada no server: app.post("/animais", ...)
// Corpo enviado: { nome, especie, tipo, sexo, idade, porte, saude, imagem, descricao }
export const cadastrarAnimal = (animal) => {
  if (USAR_MOCK) {
    const novoAnimal = { ...animal, id: Date.now(), disponivel: true };
    listaMock = [...listaMock, novoAnimal];
    return simularResposta(novoAnimal);
  }
  return Axios.post(`${URL_SERVIDOR}/animais`, animal).then((response) => response.data);
};


// CREATE — formulário de triagem "Quero Adotar"
// Rota esperada no server: app.post("/solicitacoes", ...)
// Corpo enviado: { idAnimal, nome, email, telefone, moradia, temOutrosAnimais, motivo }
export const enviarSolicitacaoAdocao = (solicitacao) => {
  if (USAR_MOCK) {
    console.log("Solicitação de adoção (mock):", solicitacao);
    return simularResposta({ sucesso: true });
  }
  return Axios.post(`${URL_SERVIDOR}/solicitacoes`, solicitacao).then((response) => response.data);
};


// CREATE — mensagem da página de Contato
// Rota esperada no server: app.post("/contatos", ...)
// Corpo enviado: { nome, email, mensagem }
export const enviarContato = (contato) => {
  if (USAR_MOCK) {
    console.log("Mensagem de contato (mock):", contato);
    return simularResposta({ sucesso: true });
  }
  return Axios.post(`${URL_SERVIDOR}/contatos`, contato).then((response) => response.data);
};


// CREATE — inscrição no boletim (rodapé)
// Rota esperada no server: app.post("/boletim", ...)
// Corpo enviado: { email }
export const inscreverBoletim = (email) => {
  if (USAR_MOCK) {
    console.log("Inscrição no boletim (mock):", email);
    return simularResposta({ sucesso: true });
  }
  return Axios.post(`${URL_SERVIDOR}/boletim`, { email }).then((response) => response.data);
};
