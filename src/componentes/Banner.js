import React from 'react';

// Banner com foto de fundo usado no topo de todas as páginas.
// Props:
//  - imagem: URL da foto de fundo (opcional, usa a do CSS por padrão)
//  - compacto: true para o banner menor das páginas internas
//  - children: conteúdo do banner (títulos, botões...)
function Banner({ imagem, compacto, children }) {
  return (
    <header
      className={compacto ? "seccao-banner banner-compacto" : "seccao-banner"}
      style={imagem ? { backgroundImage: `url('${imagem}')` } : {}}
    >
      <div className="conteudo-banner">
        {children}
      </div>
    </header>
  );
}

export default Banner;
