// Importa o MODEL, responsável por conversar com nosso banco de dados!
const ProdutoModel = require('../models/produtoModel');

// Agrupa as funções que atendem às requisições HTTP.
const ProdutoController = {
    // GET /api/produtos - lista todos os produtos
    async listar(req, res) {
        try {
            const produtos = await ProdutoModel.listarTodos(); // consulta o MODEL
            return res.status(200).json(produtos); // responde com a lista em json
        } catch (erro) {
            console.error('Erro ao listar produtos:', erro); // registra o erro no terminal
            return res.status(500).json({ mensagem: 'Erro ao consultar produtos' });
        }
    },

    // GET /api/produtos/:id - consulta um produto em específico
    async buscarPorId(req, res) {
        try {
            const id = Number(req.params.id); // converte o parâmetro da URL em número

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensagem: 'ID inválido' });
            }

            const produto = await ProdutoModel.buscarPorID(id);

            if (!produto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }

            return res.status(200).json(produto); // retorna o produto encontrado
        } catch (erro) {
            console.error('Erro ao buscar produto:', erro);
            return res.status(500).json({ mensagem: 'Erro ao consultar produto' });
        }
    },

    // POST /api/produtos - Cadastra um novo produto
    async criar(req, res) {
        try {
            const { nome, descricao, preco } = req.body; // Lê os dados enviados pelo FRONT-END
            const precoNumero = Number(preco);

            // Valida os campos obrigatórios antes de acessar o banco
            if (
                !nome ||
                !String(nome).trim() ||
                preco === undefined ||
                preco === '' ||
                !Number.isFinite(precoNumero) ||
                precoNumero < 0
            ) {
                return res.status(400).json({ mensagem: 'Informe valores válidos' });
            }

            const id = await ProdutoModel.criar({
                nome: String(nome).trim(),
                descricao: descricao ? String(descricao).trim() : null, // if ternário
                preco: precoNumero
            });

            return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', id });
        } catch (erro) {
            console.error('Erro ao cadastrar produto:', erro);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar produto.' });
        }
    }
    // Continua na próxima aula
};

module.exports = ProdutoController;
