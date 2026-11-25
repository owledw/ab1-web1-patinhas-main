import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaPaw } from 'react-icons/fa';

import { inscreverBoletim } from '../services/api';

function Rodape() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleClickButton = () => {
    if (!email.includes('@')) {
      setMensagem('Digite um email válido.');
      return;
    }
    inscreverBoletim(email)
      .then(() => {
        setMensagem('Inscrição feita! Em breve você receberá novidades.');
        setEmail('');
      })
      .catch(() => setMensagem('Não foi possível inscrever. Tente novamente.'));
  };

  return (
    <footer className="seccao-rodape">
      <div className="rodape-topo">
        <div className="coluna-rodape coluna-sobre">
          <h4>Nossa Missão</h4>
          <p>Trabalhamos diariamente para garantir que pets abandonados encontrem lares seguros e amorosos.</p>
          <div className="redes-sociais">
            <FaInstagram title="Instagram" />
            <FaWhatsapp title="WhatsApp" />
          </div>
        </div>
        <div className="coluna-rodape coluna-links">
          <ul>
            <li><Link to="/adote">Animais</Link></li>
            <li><Link to="/missao">Como Adotar</Link></li>
            <li><Link to="/contato">Doações</Link></li>
          </ul>
          <ul>
            <li><Link to="/contato">Contato</Link></li>
            <li><Link to="/cadastro">Voluntariado</Link></li>
            <li><Link to="/missao">Sobre Nós</Link></li>
          </ul>
        </div>
        <div className="coluna-rodape coluna-formulario">
          <h4>Junte-se à nossa família</h4>
          <p>Receba novidades sobre novos animais disponíveis e eventos de adoção.</p>
          <div className="formulario-boletim">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="botao-principal" onClick={handleClickButton}>Inscrever-se</button>
          </div>
          {mensagem && <p className="mensagem-boletim">{mensagem}</p>}
        </div>
      </div>
      <div className="rodape-fundo">
        <h1 className="logo-gigante">Patinhas</h1>
        <p><FaPaw /> © 2026 Patinhas Adoção.</p>
      </div>
    </footer>
  );
}

export default Rodape;
