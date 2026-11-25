import React from 'react';
import { useNavigate } from 'react-router-dom';

// Seção "Nossa Filosofia" (texto + foto lado a lado).
// Props:
//  - mostrarBotao: exibe o botão "Saiba Mais" que leva à página Nossa Missão
function SeccaoMissao({ mostrarBotao }) {
  const navigate = useNavigate();

  return (
    <section className="seccao-missao">
      <div className="texto-missao">
        <p className="subtitulo">Nossa Filosofia</p>
        <h2>Conectando corações e resgatando vidas.</h2>
        <p>
          Acreditamos que todo animal merece uma segunda chance. Nosso objetivo é
          reabilitar cães e gatos em situação de rua e encontrar tutores responsáveis.
          Uma adoção consciente transforma não só a vida do animal, mas também a sua.
        </p>
        {mostrarBotao && (
          <button
            className="botao-principal"
            style={{marginTop: '20px'}}
            onClick={() => navigate('/missao')}
          >
            Saiba Mais
          </button>
        )}
      </div>
      <div className="imagem-missao">
        <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="imagem saiba mais" title="Bichinhos na grama" />
      </div>
    </section>
  );
}

export default SeccaoMissao;
