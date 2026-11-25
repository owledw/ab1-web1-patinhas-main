import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Banner from '../componentes/Banner';
import CartaoAnimal from '../componentes/CartaoAnimal';
import SeccaoMissao from '../componentes/SeccaoMissao';
import { listarAnimais } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [animais, setAnimais] = useState([]);

  // Busca os animais uma única vez, quando a página carrega
  useEffect(() => {
    listarAnimais()
      .then((dados) => setAnimais(dados))
      .catch(() => setAnimais([]));
  }, []);

  return (
    <>
      {/*Principal*/}
      <Banner>
        <h1>Encontre um amigo. <i>De verdade.</i></h1>
        <button className="botao-principal" onClick={() => navigate('/adote')}>Ver Animais</button>
      </Banner>

      {/*Pets*/}
      <section className="seccao-animais">
        <div className="cabecalho-seccao">
          <h2>Prontos para ganhar um lar</h2>
          <p>Nossos cães e gatos estão esperando por uma família cheia de amor.</p>
        </div>

        <div className="grade-animais">
          {animais.slice(0, 3).map(animal => (
            <CartaoAnimal key={animal.id} animal={animal} />
          ))}
        </div>

        {animais.length > 3 && (
          <div className="centralizar">
            <button className="botao-principal" onClick={() => navigate('/adote')}>
              Ver todos os {animais.length} animais
            </button>
          </div>
        )}
      </section>

      {/*Saiba mais*/}
      <SeccaoMissao mostrarBotao />
    </>
  );
}
