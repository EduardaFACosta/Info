const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { readData, writeData } = require('./data/functions');

app.use(cors());
app.use(express.json());

app.get('/api/vehicle', (req, res) => { // Lista os dados de veículos
    const items = readData();
    res.status(200).json(items);
});

app.get('/api/vehicle/:id', (req, res) => { // Retorna apenas os dados de um veículo requisitado ( Retorna apenas o com ID igual o parâmetro indicado)
    const items = readData();
    const id = parseInt(req.params.id);
    const result = items.find(v => { return v.id == id });
    if (result) { res.status(200).json(result); }
    else { res.status(404).json({ error: 'Item não encontrado' }); }
});

app.post('/api/vehicle', (req, res) => { // Adiciona um novo objeto na lista de items;
    const items = readData();
    const newItem = { ...req.body };
    items.push(newItem);
    writeData(items);
    res.status(200).json(newItem);
});

app.put('/api/vehicle/:id', (req, res) => { // Lê os dados, se não encontrar o item retorna cod 404, se encontrar atualiza e retorna cod 200
    const id = parseInt(req.params.id);
    let items = readData();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = { id, ...req.body };
        writeData(items);
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

app.delete('/api/vehicle/:id', (req, res) => { // Lê os dados, filtra pelo id e "reescreve" o arquivo eliminando o item encontrado
    const id = parseInt(req.params.id);
    let items = readData();
    items = items.filter(item => item.id !== id);
    writeData(items);
    res.status(200).send();
});

app.get('/api/biggestId', (req, res) => { // Retorna o maior id no banco
    const items = readData();
    if (items && items.length > 0) {
        let id = 0;
        items.forEach(vehicle => { // Passa por todos os itens retornando o id com maior valor
            if (vehicle.id > id) {
                id = vehicle.id
            }
        });
        res.status(200).json(id);
    }
    else {
        res.status(404).json({ error: 'Não existem itens salvos no arquivo' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});