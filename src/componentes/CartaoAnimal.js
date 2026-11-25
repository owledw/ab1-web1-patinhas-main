import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from "../img/Logopatinhas.png";

// Cartão de um animal. Recebe o objeto "animal" por props.
// Props:
//  - animal: { id, nome, tipo, imagem, descricao }
//  - semBotao: true para esconder o botão (ex.: pré-visualização do cadastro)
function CartaoAnimal({ animal, semBotao }) {
  const navigate = useNavigate();

  // Se a foto não carregar, mostra a logo no lugar
  const trocarImagemQuebrada = (event) => {
    if (event.target.dataset.reserva) return;
    event.target.dataset.reserva = 'sim';
    event.target.src = Logo;
  };

  const imagem = (
    <img
      src={animal.imagem || Logo}
      alt={`Foto de ${animal.nome}`}
      onError={trocarImagemQuebrada}
    />
  );

  return (
    <div className="cartao-animal">
      {semBotao ? (
        <div className="contentor-imagem">{imagem}</div>
      ) : (
        <Link to={`/adote/${animal.id}`} className="contentor-imagem">{imagem}</Link>
      )}
      <div className="info-animal">
        <h3>{animal.nome}</h3>
        <p className="tipo-animal">{animal.tipo}</p>
        <p className="descricao-animal">{animal.descricao}</p>
        {!semBotao && (
          <button
            className="botao-secundario"
            onClick={() => navigate(`/adote/${animal.id}`)}
          >
            Quero Adotar
          </button>
        )}
      </div>
    </div>
  );
}

export default CartaoAnimal;
