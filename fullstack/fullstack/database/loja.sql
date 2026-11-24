-- cria um banco dd dados caso ele ainda não exista
CRATE DATABASE IF NOT EXISTS loja
CHARATER SET utf8mb4;
COLLATE utf8mb4_unicode_ci;

--Selecionar o banco que vai receber as tabelas
USE loja;

--cria a tabela de produtos.
CREATE TABLE  IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome varchar(120) NOT NULL,
  descricao TEXT,
  preco DECIMAL (10,2) NOT NULL,
  criado_em TIMESTAMP DEFALT CURRENT_TIMESTAMP 
);

--Inserindo alguns registro~
INSERT INTO produtos (nome, descrica0, preco) VALUES
('Teclado', 'Teclado usb', 89.90),
('Mouse', 'Mouse optico', 49.90),
('Monitor', 'monitor 24 polegadas', 799.90)