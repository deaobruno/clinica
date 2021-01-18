// Carrega a biblioteca Validator para...
import validator from 'validator';

function validation() {
    // Arquivo de dados
    const rulesTypes = ['empty', 'date', 'time'];
    let rules, msg, val;

    function empty() {
        return (!val || validator.isEmpty(val + ''));
    }

    function date() {
        return (!validator.isDate(val + '', { format: 'DD-MM-YYYY', delimiters: ['-'] }));
    }

    function time() {
        return (!validator.matches(val + '', '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'));
    }

    function array() {
        return !Array.isArray(val);
    }

    function throwError(attributeName) {
        throw new Error(msg);
    }

    // Escreve os dados do array de regras no arquivo
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