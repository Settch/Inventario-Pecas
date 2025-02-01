const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pecasRouter = require('./routes/pecas');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    ssl: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/pecas', pecasRouter);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});