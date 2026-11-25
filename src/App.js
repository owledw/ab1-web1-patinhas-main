import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import BarraNavegacao from './componentes/BarraNavegacao';
import Rodape from './componentes/Rodape';
import RolarParaTopo from './componentes/RolarParaTopo';

import Home from './paginas/Home';
import Adote from './paginas/Adote';
import DetalhesAnimal from './paginas/DetalhesAnimal';
import NossaMissao from './paginas/NossaMissao';
import Contato from './paginas/Contato';
import CadastroAnimal from './paginas/CadastroAnimal';
import NaoEncontrada from './paginas/NaoEncontrada';

function App() {
  return (
    <Router>
      <RolarParaTopo />
      <div className="contentor-aplicacao">
        {/*Barra de Navegação*/}
        <BarraNavegacao />

        {/*Páginas*/}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adote" element={<Adote />} />
          <Route exact path="/adote/:id" element={<DetalhesAnimal />} />
          <Route exact path="/missao" element={<NossaMissao />} />
          <Route exact path="/contato" element={<Contato />} />
          <Route exact path="/cadastro" element={<CadastroAnimal />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>

        {/*Rodapé*/}
        <Rodape />
      </div>
    </Router>
  );
}

export default App;
