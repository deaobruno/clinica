// Carrega o framework Express para lidar com o roteamento
import express from 'express';
const app = express();

// Carrega a factory de regras
import rulesFactory from '../modules/rules.js';

function framework() {
  const expressApp = app;
  const router = express.Router();
  const rules = rulesFactory();

  // Cadastrar regras de horários para atendimento
  router.post('/create', (req, res) => {
    res.json(rules.createRule(req.body));
  });

  // Apagar regra de horário para atendimento
  router.delete('/delete/:id', (req, res) => {
    res.json(rules.deleteRule(req.params.id));
  });

  // Listar regras de horários para atendimento
  router.get('/list', (req, res) => {
    res.json(rules.getRules());
  });

  // Listar horários disponíveis dentro de um intervalo
  router.post('/interval', (req, res) => {
    res.json(rules.getInterval(req.body));
  });

  return {
    expressApp,
    router,
    rules
  }
}

export default framework;