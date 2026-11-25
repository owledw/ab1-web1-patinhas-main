import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Sempre que a rota muda, volta a página para o topo
function RolarParaTopo() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default RolarParaTopo;
