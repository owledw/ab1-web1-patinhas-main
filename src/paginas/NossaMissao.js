import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaClipboardList, FaComments, FaHome } from 'react-icons/fa';

import Banner from '../componentes/Banner';
import SeccaoMissao from '../componentes/SeccaoMissao';

const passos = [
  { id: 1, icone: <FaSearch />, titulo: 'Escolha', texto: 'Conheça os animais disponíveis e leia a ficha de cada um.' },
  { id: 2, icone: <FaClipboardList />, titulo: 'Triagem', texto: 'Preencha o formulário "Quero Adotar" na página do pet.' },
  { id: 3, icone: <FaComments />, titulo: 'Conversa', texto: 'A protetora entra em contato para conhecer você e sua casa.' },
  { id: 4, icone: <FaHome />, titulo: 'Novo lar', texto: 'Com tudo certo, o pet vai para casa com o termo de adoção.' }
];

export default function NossaMissao() {
  const navigate = useNavigate();

  return (
    <>
      <Banner
        compacto
        imagem="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      >
        <h1>Nossa <i>Missão.</i></h1>
        <p>Adoção responsável para cães e gatos de Penedo/AL.</p>
      </Banner>

      <SeccaoMissao />

      {/*Como adotar*/}
      <section className="seccao-animais">
        <div className="cabecalho-seccao">
          <h2>Como adotar</h2>
          <p>Um processo simples, pensado para garantir um lar seguro para cada animal.</p>
        </div>

        <div className="grade-animais">
          {passos.map(passo => (
            <div className="cartao-passo" key={passo.id}>
              <span className="icone-passo">{passo.icone}</span>
              <p className="tipo-animal">Passo {passo.id}</p>
              <h3>{passo.titulo}</h3>
              <p className="descricao-animal">{passo.texto}</p>
            </div>
          ))}
        </div>

        <div className="centralizar">
          <button className="botao-principal" onClick={() => navigate('/adote')}>Ver Animais</button>
        </div>
      </section>
    </>
  );
}
