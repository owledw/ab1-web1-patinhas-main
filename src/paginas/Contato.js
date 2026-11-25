import React, { useState } from 'react';
import { FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

import Banner from '../componentes/Banner';
import { enviarContato } from '../services/api';

export default function Contato() {
  const [values, setValues] = useState({ nome: '', email: '', mensagem: '' });
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleChangeValues = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleClickButton = () => {
    if (!values.nome || !values.email || !values.mensagem) {
      setErro('Preencha todos os campos.');
      return;
    }
    setErro('');
    enviarContato(values)
      .then(() => setEnviado(true))
      .catch(() => setErro('Não foi possível enviar. Tente novamente.'));
  };

  return (
    <>
      <Banner compacto>
        <h1>Fale <i>conosco.</i></h1>
        <p>Dúvidas, doações ou voluntariado: estamos aqui.</p>
      </Banner>

      <section className="seccao-animais">
        <div className="contentor-contato">
          {/*Informações*/}
          <div className="info-contato">
            <p className="subtitulo">Contato</p>
            <h2>Ajude um animal hoje.</h2>
            <ul className="lista-ficha">
              <li><FaMapMarkerAlt /> Penedo, Alagoas</li>
              <li><FaWhatsapp /> (82) 90000-0000</li>
              <li><FaInstagram /> @patinhas.penedo</li>
              <li><FaEnvelope /> contato@patinhas.org</li>
            </ul>
          </div>

          {/*Formulário*/}
          {enviado ? (
            <div className="caixa-formulario mensagem-sucesso">
              <FaCheckCircle className="icone-sucesso" />
              <h3>Mensagem enviada!</h3>
              <p>Obrigado, {values.nome}. Responderemos em breve.</p>
            </div>
          ) : (
            <div className="caixa-formulario">
              <label>Nome</label>
              <input type="text" name="nome" value={values.nome} onChange={handleChangeValues} />

              <label>Email</label>
              <input type="email" name="email" value={values.email} onChange={handleChangeValues} />

              <label>Mensagem</label>
              <textarea name="mensagem" rows="5" value={values.mensagem} onChange={handleChangeValues} />

              {erro && <p className="mensagem-erro">{erro}</p>}

              <div className="acoes-formulario">
                <button className="botao-secundario" onClick={handleClickButton}>Enviar</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
