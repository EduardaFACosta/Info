const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { readData, writeData } = require('./data/functions');

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => { // Get, apenas le os dados
    const items = readData();
    res.status(200).json(items);
});

app.post('/api', (req, res) => { // Para o post le os dados e adiciona um valor
    const items = readData();
    const newItem = { id: Date.now(), ...req.body };
    items.push(newItem);
    writeData(items);
    res.status(200).json(newItem);
});

app.put('/api/:id', (req, res) => { // Para put,le os dados, se não encontrar o item retorna cod 404, se encontrar atualiza e retorna cod 200
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

app.delete('/api/:id', (req, res) => { // Para o delete, le os dados, filtra pelo id e "reescreve" o arquivo
    const id = parseInt(req.params.id);
    let items = readData();
    items = items.filter(item => item.id !== id);
    writeData(items);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});