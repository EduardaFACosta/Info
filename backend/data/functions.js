const fs = require('fs'); //Para ler os arquivos
const path = require('path'); //Para ler o "local"

const filePath = path.join(__dirname, 'data.json'); //__dirname contém o caminho completo

function readData() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Ocorreu um erro ao ler arquivo:', error);
        return [];
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8'); // 2 por causa da indentação do nível
    } catch (error) {
        console.error('Ocorreu um erro ao tentar escrever no arquivo:', error);
    }
}

module.exports = { readData, writeData }; //Exporta para ser acessível no server.js