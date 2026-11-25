-- Banco de dados do Patinhas
-- Rode este arquivo inteiro no MySQL Workbench uma única vez.
-- ATENÇÃO: ele apaga e recria as tabelas, então não rode de novo
-- depois de ter dados reais cadastrados.

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS patinhas
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE patinhas;

DROP TABLE IF EXISTS solicitacoes;
DROP TABLE IF EXISTS animais;
DROP TABLE IF EXISTS contatos;
DROP TABLE IF EXISTS boletim;

-- Animais disponíveis para adoção
-- (os nomes das colunas são os mesmos campos usados no React)
CREATE TABLE animais (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(60)  NOT NULL,
  especie     ENUM('cachorro', 'gato') NOT NULL,
  tipo        VARCHAR(40),
  sexo        VARCHAR(10),
  idade       VARCHAR(30),
  porte       VARCHAR(20),
  saude       VARCHAR(120),
  imagem      VARCHAR(500),
  descricao   TEXT NOT NULL,
  disponivel  BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pedidos do formulário "Quero Adotar"
CREATE TABLE solicitacoes (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  id_animal           INT NOT NULL,
  nome                VARCHAR(100) NOT NULL,
  email               VARCHAR(120) NOT NULL,
  telefone            VARCHAR(30)  NOT NULL,
  moradia             VARCHAR(40)  NOT NULL,
  tem_outros_animais  VARCHAR(5),
  motivo              TEXT,
  status              VARCHAR(20) NOT NULL DEFAULT 'pendente',
  criado_em           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_animal) REFERENCES animais(id)
);

-- Mensagens da página Contato
CREATE TABLE contatos (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(120) NOT NULL,
  mensagem   TEXT NOT NULL,
  criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emails inscritos no boletim (rodapé)
CREATE TABLE boletim (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(120) NOT NULL UNIQUE,
  criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Animais iniciais (os mesmos do arquivo src/dados/animais.js)
INSERT INTO animais (nome, especie, tipo, sexo, idade, porte, saude, imagem, descricao) VALUES
('Luna', 'gato', 'Gatinha', 'Fêmea', '1 ano', 'Pequeno', 'Vacinada e castrada',
 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
 'Dócil e brincalhona, adora um carinho.'),
('Max', 'cachorro', 'Cachorro', 'Macho', '3 anos', 'Médio', 'Vacinado e vermifugado',
 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
 'Energético e leal, ama brincar na chuva.'),
('Milo', 'gato', 'Gatinho', 'Macho', '8 meses', 'Pequeno', 'Vacinado',
 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
 'Calmo e dorminhoco. Está sempre com fome.'),
('Thor', 'cachorro', 'Cachorro', 'Macho', '2 anos', 'Grande', 'Vacinado e castrado',
 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
 'Protetor e carinhoso, ótimo com crianças.'),
('Mel', 'gato', 'Gatinha', 'Fêmea', '4 anos', 'Pequeno', 'Castrada, em tratamento de pele',
 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
 'Tímida no começo, mas muito companheira.'),
('Pipoca', 'cachorro', 'Cachorrinha', 'Fêmea', '5 meses', 'Pequeno', 'Primeira dose de vacina',
 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
 'Filhote curiosa que adora correr atrás da bolinha.');
