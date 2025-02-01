const express = require('express');
const router = express.Router();
const Peca = require('../models/Peca');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configuração temporária para upload de imagens

// Listar todas as peças
router.get('/', async (req, res) => {
    try {
        const pecas = await Peca.find();
        res.json(pecas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar peças' });
    }
});

// Adicionar uma nova peça
router.post('/', upload.single('imagem'), async (req, res) => {
    try {
        const peca = new Peca({
            nome: req.body.nome,
            descricao: req.body.descricao,
            quantidade: req.body.quantidade,
            imagem: req.file ? req.file.path : null, // Salva o caminho da imagem
        });
        await peca.save();
        res.status(201).json(peca);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar peça' });
    }
});

// Atualizar uma peça
router.put('/:id', upload.single('imagem'), async (req, res) => {
    try {
        const peca = await Peca.findById(req.params.id);
        if (!peca) return res.status(404).json({ error: 'Peça não encontrada' });

        peca.nome = req.body.nome;
        peca.descricao = req.body.descricao;
        peca.quantidade = req.body.quantidade;
        if (req.file) {
            peca.imagem = req.file.path; // Atualiza o caminho da imagem
        }
        await peca.save();
        res.json(peca);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar peça' });
    }
});

// Excluir uma peça
router.delete('/:id', async (req, res) => {
    try {
        await Peca.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir peça' });
    }
});

module.exports = router;