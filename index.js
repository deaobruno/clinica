// Carrega o framework Express
import express from 'express';
const app = express();

// Carrega a biblioteca Body Parser tratar o parâmetro 'body' das requisições recebidas
import bodyParser from 'body-parser';

// Carrega o arquivo de rotas
import routes from './routes/routes.js';

//
app.use(bodyParser.json({
    extended: true
}));

// Importa o arquivo de rotas
app.use(routes);

// Habilita a aplicação a escutar uma porta
app.listen('8000');