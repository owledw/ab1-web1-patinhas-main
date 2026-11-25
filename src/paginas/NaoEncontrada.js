import React from 'react';
import { useNavigate } from 'react-router-dom';

import Banner from '../componentes/Banner';

export default function NaoEncontrada() {
  const navigate = useNavigate();

  return (
    <Banner compacto>
      <h1>Página não <i>encontrada.</i></h1>
      <button className="botao-principal" onClick={() => navigate('/')}>Voltar ao início</button>
    </Banner>
  );
}
