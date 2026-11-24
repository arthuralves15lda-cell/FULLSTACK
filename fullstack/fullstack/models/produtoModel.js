//MODEL ele é responsavel por conversar com o banco de dados

// Importa o pool de conexoes com o MySQL
const db = require('../config/database');

// Define todas as consultas relacionadas aos produtos
const ProdutoModel = {
  // async (Assíncrona) = Permite iniciar uma tarefa e continuar executando outras instruções enquanto aguarda a conclusão
  // sync (Síncrona) = executa uma tarefa por vez; a próxima instrução espera a anterior terminar

  // Busca produtos cadastrados (SELECT)
  async listarTodos() {
    const [linhas] = await db.query(
      'SELECT id, nome, descricao, preco, criado_em FROM produtos'
    );
    return linhas; // devolve a lista encontrada
  },

  // Busca um produto pelo ID (SELECT com WHERE)
  async buscarPorID(id) {
    const [linhas] = await db.query(
      'SELECT id, nome, descricao, preco, criado_em FROM produtos WHERE id = ?',
      [id]
    );
    return linhas[0]; // retorna o primeiro resultado
  },

  // Cadastrar um Produto
  async criar(produto) {
    const { nome, descricao, preco } = produto; // Extrai os dados recebidos
    const [resultado] = await db.query(
      'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
      [nome, descricao || null, preco] // Envia os valores separadamente para o SQL
    );
    return resultado.insertId; // retorna o ID gerado pelo MySQL
  },

  // Atualizar um Produto
  async atualizar(id, produto) {
    const { nome, descricao, preco } = produto; // Extrai os novos dados
    const [resultado] = await db.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
      [nome, descricao || null, preco, id] // Define os valores e o produto alvo
    );
    return resultado.affectedRows; // informa quantas linhas foram afetadas
  },

  // Excluir um Produto
  async excluir(id) {
    const [resultado] = await db.query(
      'DELETE FROM produtos WHERE id = ?',
      [id]
    );
    return resultado.affectedRows;
  }
};

module.exports = ProdutoModel;
