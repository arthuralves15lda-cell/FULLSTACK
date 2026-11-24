//carrega as variaveis do arquivo .env antes de iniciar a aplicação
require('dotenv').config();

//Importar o Express, responsavel pelo servidor HTTP
const express = require('express');

// Importa o CORS para permitir requisicoes do Front-End em outras origens.
const cors = require('cors');

// Importa as rotas de produtos
const produtosRoutes = require('./routes/produtosRoutes.js');

// Cria a aplicação Express
const app = express()

// Permite requisições de origens diferentes durante o desenvolvimento
app.use(cors());

// Permite que o servidor interprete corpos de requisicoes em JSON
app.use(express.json());

// Disponibiliza os arquivos HTML, CSS e JS da pasta public
app.use(express.static('public'));

// Define o caminho base da API para todas as rotas de produtos
app.use('/api/produtos', produtoRoutes);

// Rota simples para verificar se a API esta funcionando.
app.get('/api', (req, res) => {
  res.json({mensagem: 'API de produtos funcionando!'})
})

// dEFINE A PORTAPELO .ENV OU UTILIZA A 300 como padrao
const port = process.env.PORT || 300;

// Inicia o servidor e mostra o endereço no terminal
app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:${PORT}');
})