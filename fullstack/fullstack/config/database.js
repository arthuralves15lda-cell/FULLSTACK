// Importa o pacote MySQL
const mysql = require('mysql2/promise');

//carregar as variaveis de ambiente de detEnv
require('dontenv').config();

//Criar um pool de conexões para reutilizar conexções com mysql
const pool = mysql.createPoll({
  host: process.env.DB_HOST, //Endereço do servidor MySQL
  port: Number(process.env.DB_PORT), //porta do MySQL
  user: process.env.DB_USER, //Usuario do banco
  password: process.env.DB_PASSWORD, //senha do banco
  database: process.env.DB_NAME, //Nome do banco de dados
  waitForConnections: true, //aguarda a conexão ficar disponivel
  connectionLimit: 10, // Limita a quantidade de conexoes simuntaneas
  queueLimit: 0 // Sem limites para fila de requisições
})
//Exporta o poll para os models possam executar comandos no SQL
module.exports = pool