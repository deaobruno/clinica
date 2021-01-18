// Carrega a biblioteca Body Parser tratar o parâmetro 'body' das requisições recebidas
import bodyParser from 'body-parser';
// Carrega o arquivo de rotas
import frameworkFactory from './routes/routes.js';

const framework = frameworkFactory();
const app = framework.expressApp;

//
app.use(bodyParser.json({
  extended: true
}));

// Importa o gerenciador de rotas
app.use(framework.router);

// Callback para padronização de resposta de erros
app.use(function(err, req, res, next) {
  if (!err.statusCode)
    err.statusCode = 500;

  res.status(err.statusCode).send(err.message);
});

// Habilita a aplicação a escutar uma porta
app.listen('8000');