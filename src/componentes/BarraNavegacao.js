import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaHeart, FaEnvelope, FaPlus, FaBars, FaTimes } from 'react-icons/fa';

import Logo from "../img/Logopatinhas.png";

function BarraNavegacao() {
  // Controla o menu no celular (renderização condicional)
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <nav className="barra-navegacao">
      <Link to="/" className="logo" onClick={fecharMenu}>
        <span>Patinhas</span>
        <img
          src={Logo}
          alt="Logótipo Patinhas"
          title="Logo"
          className="imagem-logo"
        />
      </Link>

      <button
        className="botao-menu"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
      >
        {menuAberto ? <FaTimes /> : <FaBars />}
      </button>

      <ul className={menuAberto ? "links-navegacao aberto" : "links-navegacao"}>
        <li><Link to="/adote" onClick={fecharMenu}><FaPaw /> Adote</Link></li>
        <li><Link to="/missao" onClick={fecharMenu}><FaHeart /> Nossa Missão</Link></li>
        <li><Link to="/contato" onClick={fecharMenu}><FaEnvelope /> Contato</Link></li>
        <li><Link to="/cadastro" onClick={fecharMenu}><FaPlus /> Cadastrar Pet</Link></li>
      </ul>
    </nav>
  );
}

export default BarraNavegacao;
