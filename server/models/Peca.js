const mongoose = require('mongoose');

const PecaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    quantidade: { type: Number, required: true },
    imagem: { type: String }, // URL da imagem
});

module.exports = mongoose.model('Peca', PecaSchema);