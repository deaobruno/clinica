// Carrega a biblioteca Validator para...
import validatorFactory from './validation.js';
const validation = validatorFactory();

// Carrega a factory do gerenciador do arquivo de regitros
import filesFactory from './file.js';
const files = filesFactory();

function rules() {
    let rules = files.rulesData;

    let newDay = new Date();

    let day, end, endDate, intervals, limit, start, startDate, weekdays;

    const validationRules = {
        'day': ['empty', 'date'],
        'end': ['empty', 'time'],
        'endDate': ['empty', 'date'],
        'intervals': ['empty'],
        'limit': ['empty', 'date'],
        'start': ['empty', 'time'],
        'startDate': ['empty', 'date'],
        'weekdays': ['empty', 'array']
    };

    // Retorna o próximo ID disponível
    function nextId() {
        return (rules.length > 0) ? rules[rules.length - 1].id + 1 : 1;
    }

    // Gravar registro único
    function createUnique() {
        intervals.forEach((interval) => {
            rules.push({
                'id': nextId(),
                'day': day,
                'start': interval.start,
                'end': interval.end
            });
        });

        files.saveFile();
    }

    // Gravar registros múltiplos
    function createMultiple() {
        let weekDay, month, ruleDay, year;

        for (newDay; newDay <= formatDate(limit); newDay.setDate(newDay.getDate() + 1)) {
            ruleDay = newDay.getDate();
            ruleDay = (ruleDay < 10) ? '0' + ruleDay : ruleDay;

            month = newDay.getMonth() + 1;
            month = (month < 10) ? '0' + month : month;
            
            year = newDay.getFullYear();

            day = ruleDay + '-' + month + '-' + year;

            if (weekdays)
                weekDay = new Date(year, newDay.getMonth(), ruleDay).getDay();

            if (!weekdays || (weekdays && weekdays.indexOf(weekDay) !== -1))
                createUnique();
        }
    }

    // Coverte a data para o padrão do JS
    function formatDate(date) {
        date = date.split('-');

        return new Date(date[2], date[1] - 1, parseInt(date[0]) + 1);
    }

    // Cadastrar regras de horários para atendimento
    function createRule(params) {
        let flag = params.flag;

        intervals = params.intervals;
        day = params.day;
        limit = params.limit;
        weekdays = params.weekdays;

        validation.validate('intervals', intervals, validationRules['intervals']);

        intervals.forEach((interval) => {
            validation.validate('start', interval.start, validationRules['start']);
            validation.validate('end', interval.end, validationRules['end']);
        });

        switch (flag) {
            case 'u':
                validation.validate('day', day, validationRules['day']);

                createUnique();

                break;

            case 'd':
                validation.validate('limit', limit, validationRules['limit']);

                createMultiple();

                break;

            case 'w':
                validation.validate('limit', limit, validationRules['limit']);
                validation.validate('weekdays', weekdays, validationRules['weekdays']);

                createMultiple();

                break;

            default:
                throw new Error('Missing or wrong "flag".');

                break;
        }

        return rules;
    }

    // Apagar regra de horário para atendimento
    function deleteRule(id) {
        let dataLength = rules.length;
        let dataLengthAfter;

        let ruleFound = rules.find(rule => rule.id === parseInt(id));
        let ruleIndex = rules.indexOf(ruleFound);

        if (ruleIndex !== -1)
            rules.splice(ruleIndex, 1);

        dataLengthAfter = rules.length;

        if (dataLength == dataLengthAfter)
            throw new Error('No rule found to delete.');
    
        files.saveFile();

        return rules;
    }

    // Listar regras de horários para atendimento
    function getRules() {
        return rules;
    }

    // Listar horários disponíveis dentro de um intervalo
    function getInterval(params) {
        let ruleDay;

        validation.validate('start', params.start, validationRules['startDate']);
        validation.validate('end', params.end, validationRules['endDate']);

        startDate = formatDate(params.start);
        endDate = formatDate(params.end);

        return rules.filter((rule) => {
            ruleDay = formatDate(rule.day);

            return (startDate <= ruleDay) && (ruleDay <= endDate);
        });
    }

    return {
        createRule,
        deleteRule,
        getRules,
        getInterval
    };
}

export default rules;