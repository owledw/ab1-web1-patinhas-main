import React, { useEffect, useState } from 'react';
import { FaSearch, FaPaw, FaDog, FaCat } from 'react-icons/fa';

import Banner from '../componentes/Banner';
import CartaoAnimal from '../componentes/CartaoAnimal';
import { listarAnimais } from '../services/api';

const filtros = [
  { valor: 'todos', texto: 'Todos', icone: <FaPaw /> },
  { valor: 'cachorro', texto: 'Cães', icone: <FaDog /> },
  { valor: 'gato', texto: 'Gatos', icone: <FaCat /> }
];

export default function Adote() {
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [especie, setEspecie] = useState('todos');
  const [erro, setErro] = useState(false);

  useEffect(() => {
    listarAnimais()
      .then((dados) => setAnimais(dados))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  // Aplica a busca por nome e o filtro de espécie
  const animaisFiltrados = animais.filter((animal) => {
    const nomeConfere = animal.nome.toLowerCase().includes(busca.toLowerCase());
    const especieConfere = especie === 'todos' || animal.especie === especie;
    return nomeConfere && especieConfere;
  });

  return (
    <>
      <Banner
        compacto
        imagem="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      >
        <h1>Adote um <i>amigo.</i></h1>
        <p>Conheça os cães e gatos resgatados em Penedo/AL.</p>
      </Banner>

      <section className="seccao-animais">
        {/*Filtros*/}
        <div className="barra-filtros">
          <div className="campo-busca">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar pelo nome"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </div>

          <div className="botoes-filtro">
            {filtros.map((filtro) => (
              <button
                key={filtro.valor}
                className={especie === filtro.valor ? 'botao-filtro ativo' : 'botao-filtro'}
                onClick={() => setEspecie(filtro.valor)}
              >
                {filtro.icone} {filtro.texto}
              </button>
            ))}
          </div>
        </div>

        {/*Lista*/}
        {carregando ? (
          <p className="mensagem-vazia">Carregando animais...</p>
        ) : erro ? (
          <p className="mensagem-vazia">Não foi possível carregar os animais. Verifique se o servidor está ligado.</p>
        ) : animaisFiltrados.length === 0 ? (
          <p className="mensagem-vazia">Nenhum animal encontrado com esses filtros.</p>
        ) : (
          <div className="grade-animais">
            {animaisFiltrados.map(animal => (
              <CartaoAnimal key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
