import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaVenusMars, FaBirthdayCake, FaRulerVertical, FaHeartbeat } from 'react-icons/fa';

import Banner from '../componentes/Banner';
import FormularioTriagem from '../componentes/FormularioTriagem';
import { buscarAnimalPorId } from '../services/api';

import Logo from "../img/Logopatinhas.png";

export default function DetalhesAnimal() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Busca o animal sempre que o id da URL mudar
  useEffect(() => {
    setCarregando(true);
    buscarAnimalPorId(id)
      .then((dados) => setAnimal(dados))
      .catch(() => setAnimal(null))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return (
      <>
        <Banner compacto><h1>Carregando...</h1></Banner>
        <section className="seccao-animais"></section>
      </>
    );
  }

  if (!animal) {
    return (
      <>
        <Banner compacto><h1>Animal não encontrado</h1></Banner>
        <section className="seccao-animais centralizar">
          <Link to="/adote" className="link-voltar"><FaArrowLeft /> Voltar para a lista</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Banner compacto imagem={animal.imagem}>
        <h1>{animal.nome}</h1>
        <p>{animal.tipo}</p>
      </Banner>

      <section className="seccao-animais">
        <Link to="/adote" className="link-voltar"><FaArrowLeft /> Voltar para a lista</Link>

        <div className="ficha-animal">
          <div className="ficha-imagem">
            <img
              src={animal.imagem || Logo}
              alt={`Foto de ${animal.nome}`}
              onError={(event) => {
                if (event.target.dataset.reserva) return;
                event.target.dataset.reserva = 'sim';
                event.target.src = Logo;
              }}
            />
          </div>

          <div className="ficha-info">
            <p className="subtitulo">Ficha do pet</p>
            <h2>{animal.nome}</h2>
            <p className="descricao-animal">{animal.descricao}</p>

            <ul className="lista-ficha">
              <li><FaVenusMars /> <strong>Sexo:</strong> {animal.sexo}</li>
              <li><FaBirthdayCake /> <strong>Idade:</strong> {animal.idade}</li>
              <li><FaRulerVertical /> <strong>Porte:</strong> {animal.porte}</li>
              <li><FaHeartbeat /> <strong>Saúde:</strong> {animal.saude}</li>
            </ul>

            {!mostrarFormulario && (
              <button className="botao-principal" onClick={() => setMostrarFormulario(true)}>
                Quero Adotar
              </button>
            )}
          </div>
        </div>

        {mostrarFormulario && (
          <FormularioTriagem animal={animal} aoFechar={() => setMostrarFormulario(false)} />
        )}
      </section>
    </>
  );
}
