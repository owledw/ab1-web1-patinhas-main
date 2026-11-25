// =====================================================================
// DADOS SIMULADOS (MOCK) — usados enquanto o banco de dados não existe.
// Quando a conexão com o MySQL estiver pronta, este arquivo deixa de ser
// usado (basta trocar USAR_MOCK para false em src/services/api.js).
//
// Sugestão de colunas para a tabela "animais" (mesmos nomes dos campos):
// id, nome, especie, tipo, sexo, idade, porte, saude, imagem, descricao,
// disponivel
// =====================================================================

const animais = [
  {
    id: 1, nome: 'Luna', especie: 'gato', tipo: 'Gatinha',
    sexo: 'Fêmea', idade: '1 ano', porte: 'Pequeno',
    saude: 'Vacinada e castrada',
    imagem: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    descricao: 'Dócil e brincalhona, adora um carinho.',
    disponivel: true
  },
  {
    id: 2, nome: 'Max', especie: 'cachorro', tipo: 'Cachorro',
    sexo: 'Macho', idade: '3 anos', porte: 'Médio',
    saude: 'Vacinado e vermifugado',
    imagem: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    descricao: 'Energético e leal, ama brincar na chuva.',
    disponivel: true
  },
  {
    id: 3, nome: 'Milo', especie: 'gato', tipo: 'Gatinho',
    sexo: 'Macho', idade: '8 meses', porte: 'Pequeno',
    saude: 'Vacinado',
    imagem: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    descricao: 'Calmo e dorminhoco. Está sempre com fome.',
    disponivel: true
  },
  {
    id: 4, nome: 'Thor', especie: 'cachorro', tipo: 'Cachorro',
    sexo: 'Macho', idade: '2 anos', porte: 'Grande',
    saude: 'Vacinado e castrado',
    imagem: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    descricao: 'Protetor e carinhoso, ótimo com crianças.',
    disponivel: true
  },
  {
    id: 5, nome: 'Mel', especie: 'gato', tipo: 'Gatinha',
    sexo: 'Fêmea', idade: '4 anos', porte: 'Pequeno',
    saude: 'Castrada, em tratamento de pele',
    imagem: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    descricao: 'Tímida no começo, mas muito companheira.',
    disponivel: true
  },
  {
    id: 6, nome: 'Pipoca', especie: 'cachorro', tipo: 'Cachorrinha',
    sexo: 'Fêmea', idade: '5 meses', porte: 'Pequeno',
    saude: 'Primeira dose de vacina',
    imagem: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    descricao: 'Filhote curiosa que adora correr atrás da bolinha.',
    disponivel: true
  }
];

export default animais;
