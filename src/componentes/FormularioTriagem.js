import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import { enviarSolicitacaoAdocao } from '../services/api';

// Formulário de triagem para quem quer adotar.
// Props:
//  - animal: animal escolhido (usa id e nome)
//  - aoFechar: função chamada no botão "Cancelar"
function FormularioTriagem({ animal, aoFechar }) {
  const [values, setValues] = useState({
    nome: '',
    email: '',
    telefone: '',
    moradia: '',
    temOutrosAnimais: '',
    motivo: ''
  });
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Captura o que foi digitado em qualquer campo (usa o "name" do campo)
  const handleChangeValues = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleClickButton = () => {
    if (!values.nome || !values.email || !values.telefone || !values.moradia) {
      setErro('Preencha nome, email, telefone e tipo de moradia.');
      return;
    }
    setErro('');
    setEnviando(true);

    enviarSolicitacaoAdocao({ idAnimal: animal.id, ...values })
      .then(() => setEnviado(true))
      .catch(() => setErro('Não foi possível enviar. Tente novamente.'))
      .finally(() => setEnviando(false));
  };

  // Renderização condicional: depois de enviar, mostra só a confirmação
  if (enviado) {
    return (
      <div className="caixa-formulario mensagem-sucesso">
        <FaCheckCircle className="icone-sucesso" />
        <h3>Pedido enviado!</h3>
        <p>Obrigado, {values.nome}. A equipe Patinhas entrará em contato sobre a adoção de {animal.nome}.</p>
      </div>
    );
  }

  return (
    <div className="caixa-formulario">
      <h3>Quero adotar {animal.nome}</h3>
      <p className="descricao-animal">Responda algumas perguntas para começarmos a triagem.</p>

      <label>Nome completo</label>
      <input type="text" name="nome" value={values.nome} onChange={handleChangeValues} />

      <div className="linha-formulario">
        <div>
          <label>Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChangeValues} />
        </div>
        <div>
          <label>Telefone / WhatsApp</label>
          <input type="tel" name="telefone" value={values.telefone} onChange={handleChangeValues} />
        </div>
      </div>

      <div className="linha-formulario">
        <div>
          <label>Tipo de moradia</label>
          <select name="moradia" value={values.moradia} onChange={handleChangeValues}>
            <option value="">Selecione</option>
            <option value="Casa com quintal">Casa com quintal</option>
            <option value="Casa sem quintal">Casa sem quintal</option>
            <option value="Apartamento">Apartamento</option>
          </select>
        </div>
        <div>
          <label>Tem outros animais?</label>
          <select name="temOutrosAnimais" value={values.temOutrosAnimais} onChange={handleChangeValues}>
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
      </div>

      <label>Por que você quer adotar?</label>
      <textarea name="motivo" rows="4" value={values.motivo} onChange={handleChangeValues} />

      {erro && <p className="mensagem-erro">{erro}</p>}

      <div className="acoes-formulario">
        <button className="botao-secundario" onClick={handleClickButton} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar pedido'}
        </button>
        <button className="botao-texto" onClick={aoFechar}>Cancelar</button>
      </div>
    </div>
  );
}

export default FormularioTriagem;
