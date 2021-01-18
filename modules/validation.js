// Carrega a biblioteca Validator para validar atributos
import validator from 'validator';

function validation() {
  const rulesTypes = ['empty', 'date', 'time'];
  let rules, msg, val;

  // Valida se o atributo existe ou está vazio
  function empty() {
    return (!val || validator.isEmpty(val + ''));
  }

  // Valida se o atributo atende o formato de data
  function date() {
    return (!validator.isDate(val + '', { format: 'DD-MM-YYYY', delimiters: ['-'] }));
  }

  // Valida se o atributo atende o formato de tempo
  function time() {
    return (!validator.matches(val + '', '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'));
  }

  // Valida se o atributo é um array
  function array() {
    return !Array.isArray(val);
  }

  // Retorna uma mensagem de erro caso algum atributo não tenha passado na validação
  function throwError(attributeName) {
    throw new Error(msg);
  }

  // Valida os atributos das regras
  function validate(attribute, value, rulesArray) {
    let answer;

    val = value;
    rules = rulesArray;

    rules.forEach((rule) => {
      switch (rule) {
        case 'empty':
          msg = 'Missing "'+ attribute +'".';
          answer = empty();
          break;

        case 'date':
          msg = '"'+ attribute +'" is not in DD-MM-YYYY format.';
          answer = date();
          break;

        case 'time':
          msg = '"'+ attribute +'" is not in hh:mm format.';
          answer = time();
          break;

        case 'array':
          msg = '"'+ attribute +'" is not an array.';
          answer = array();
          break;
      }

      if (answer === true)
          throwError();
    });
  };

  return {
    validate
  }
}

export default validation;