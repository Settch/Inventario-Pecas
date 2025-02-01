document.addEventListener('DOMContentLoaded', () => {
    const pecaForm = document.getElementById('pecaForm');
    const pecaId = document.getElementById('pecaId');
    const nomeInput = document.getElementById('nome');
    const descricaoInput = document.getElementById('descricao');
    const quantidadeInput = document.getElementById('quantidade');
    const imagemInput = document.getElementById('imagem');
    const pecasList = document.getElementById('pecasList');

    // Carregar peças do servidor
    loadPecas();

    // Adicionar ou editar peça
    pecaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = pecaId.value;
        const nome = nomeInput.value;
        const descricao = descricaoInput.value;
        const quantidade = quantidadeInput.value;
        const imagem = imagemInput.files[0];

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        formData.append('quantidade', quantidade);
        if (imagem) {
            formData.append('imagem', imagem);
        }

        try {
            if (id) {
                await fetch(`/api/pecas/${id}`, {
                    method: 'PUT',
                    body: formData
                });
            } else {
                await fetch('/api/pecas', {
                    method: 'POST',
                    body: formData
                });
            }
            loadPecas();
            pecaForm.reset();
            pecaId.value = '';
        } catch (error) {
            console.error('Erro ao adicionar/editar peça:', error);
        }
    });

    // Carregar peças
    async function loadPecas() {
        const response = await fetch('/api/pecas');
        const pecas = await response.json();
        pecasList.innerHTML = '';
        pecas.forEach(peca => {
            const pecaDiv = document.createElement('div');
            pecaDiv.classList.add('peca');
            pecaDiv.innerHTML = `
                <h3>${peca.nome}</h3>
                <p>${peca.descricao}</p>
                <p>Quantidade: ${peca.quantidade}</p>
                ${peca.imagem ? `<img src="${peca.imagem}" alt="${peca.nome}">` : ''}
                <button class="edit-button" onclick="editPeca('${peca._id}', '${peca.nome}', '${peca.descricao}', ${peca.quantidade})">Editar</button>
                <button class="delete-button" onclick="deletePeca('${peca._id}')">Excluir</button>
            `;
            pecasList.appendChild(pecaDiv);
        });
    }

    // Editar peça
    window.editPeca = (id, nome, descricao, quantidade) => {
        pecaId.value = id;
        nomeInput.value = nome;
        descricaoInput.value = descricao;
        quantidadeInput.value = quantidade;
    };

    // Excluir peça
    window.deletePeca = async (id) => {
        await fetch(`/api/pecas/${id}`, {
            method: 'DELETE'
        });
        loadPecas();
    };
});