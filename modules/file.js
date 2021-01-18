// Carrega a biblioteca File System para gerenciar o acesso ao arquivo de registros
import fs from 'fs';

function file() {
  // Arquivo de dados
  const dataFile = './data/rules.json';

  // Dados formatados para JSON
  let rulesData = JSON.parse(fs.readFileSync(dataFile));

  // Escreve os dados do array de regras no arquivo
  function saveFile() {
    fs.writeFile(dataFile, JSON.stringify(rulesData), (err) => {
      if (err)
        throw err;
    });
  };

  return {
    rulesData,
    saveFile
  }
}

export default file;