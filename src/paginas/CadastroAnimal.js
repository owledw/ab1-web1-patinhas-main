import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

import Banner from '../componentes/Banner';
import CartaoAnimal from '../componentes/CartaoAnimal';
import { cadastrarAnimal } from '../services/api';

const valoresIniciais = {
  nome: '',
  especie: '',
  tipo: '',
  sexo: '',
  idade: '',
  porte: '',
  saude: '',
  imagem: '',
  descricao: ''
};

// Área do Protetor: cadastro de novos animais (Create)
export default function CadastroAnimal() {
  const [values, setValues] = useState(valoresIniciais);
  const [erro, setErro] = useState('');
  const [animalSalvo, setAnimalSalvo] = useState(null);

  const handleChangeValues = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleClickButton = () => {
    if (!values.nome || !values.especie || !values.descricao) {
      setErro('Preencha pelo menos nome, espécie e descrição.');
      return;
    }
    setErro('');

    cadastrarAnimal(values)
      .then((novoAnimal) => {
        setAnimalSalvo(novoAnimal);
        setValues(valoresIniciais);
      })
      .catch(() => setErro('Não foi possível cadastrar. Verifique se o servidor está ligado.'));
  };

  return (
    <>
      <Banner compacto>
        <h1>Área do <i>Protetor.</i></h1>
        <p>Cadastre um animal resgatado para divulgação.</p>
      </Banner>

      <section className="seccao-animais">
        {animalSalvo && (
          <div className="caixa-formulario mensagem-sucesso">
            <FaCheckCircle className="icone-sucesso" />
            <h3>{animalSalvo.nome} foi cadastrado(a)!</h3>
            <p>
              <Link to={`/adote/${animalSalvo.id}`}>Ver ficha</Link> ou cadastre outro animal abaixo.
            </p>
          </div>
        )}

        <div className="contentor-contato">
          {/*Formulário*/}
          <div className="caixa-formulario">
            <label>Nome do pet</label>
            <input type="text" name="nome" value={values.nome} onChange={handleChangeValues} />

            <div className="linha-formulario">
              <div>
                <label>Espécie</label>
                <select name="especie" value={values.especie} onChange={handleChangeValues}>
                  <option value="">Selecione</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                </select>
              </div>
              <div>
                <label>Sexo</label>
                <select name="sexo" value={values.sexo} onChange={handleChangeValues}>
                  <option value="">Selecione</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
              </div>
            </div>

            <div className="linha-formulario">
              <div>
                <label>Tipo (ex.: Gatinha, Cachorro)</label>
                <input type="text" name="tipo" value={values.tipo} onChange={handleChangeValues} />
              </div>
              <div>
                <label>Idade</label>
                <input type="text" name="idade" value={values.idade} onChange={handleChangeValues} />
              </div>
            </div>

            <div className="linha-formulario">
              <div>
                <label>Porte</label>
                <select name="porte" value={values.porte} onChange={handleChangeValues}>
                  <option value="">Selecione</option>
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>
              <div>
                <label>Saúde</label>
                <input type="text" name="saude" value={values.saude} onChange={handleChangeValues} />
              </div>
            </div>

            <label>Link da foto</label>
            <input type="text" name="imagem" value={values.imagem} onChange={handleChangeValues} />

            <label>Descrição</label>
            <textarea name="descricao" rows="3" value={values.descricao} onChange={handleChangeValues} />

            {erro && <p className="mensagem-erro">{erro}</p>}

            <div className="acoes-formulario">
              <button className="botao-secundario" onClick={handleClickButton}>Cadastrar</button>
            </div>
          </div>

          {/*Pré-visualização: só aparece quando o nome é digitado*/}
          <div className="previa-cadastro">
            <p className="subtitulo">Pré-visualização</p>
            {values.nome ? (
              <CartaoAnimal animal={{ ...values, id: 'previa' }} semBotao />
            ) : (
              <p className="descricao-animal">Digite o nome do pet para ver como o cartão vai ficar.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
