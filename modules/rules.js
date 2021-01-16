// Carrega a biblioteca Validator para...
import validator from 'validator';
// Carrega a factory do gerenciador do arquivo de regitros
import filesFactory from './files.js';
const files = filesFactory();

function rules() {
    let rules = files.rulesData;

    let newDay = new Date();

    let day, end, intervals, limit, month, ruleDay, start, weekdays;

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
        let weekDay, year;

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

        // if (validator.isEmpty(intervals))
        //     throw new Error('Missing "intervals".');

        intervals.forEach((interval) => {
            if (!interval.start || validator.isEmpty(interval.start))
                throw new Error('Missing start "date".');

            if (!interval.end || validator.isEmpty(interval.end))
                throw new Error('Missing end "date".');
        });

        switch (flag) {
            case 'u':
                if (!day || validator.isEmpty(day))
                    throw new Error('Missing "day".');

                if (!validator.isDate(day, { format: 'DD-MM-YYYY', delimiters: ['-'] }))
                    throw new Error('"day" in wrong format.');

                createUnique();

                break;

            case 'd':
                if (!validator.isDate(limit, { format: 'DD-MM-YYYY', delimiters: ['-'] }))
                    throw new Error('"limit" in wrong format.');

                createMultiple();

                break;

            case 'w':
                if (!validator.isDate(limit, { format: 'DD-MM-YYYY', delimiters: ['-'] }))
                    throw new Error('"limit" in wrong format.');

                if (!weekdays)
                    throw new Error('Missing "weekdays".');

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

        // if (validator.equals(dataLength, dataLengthAfter))
        //     throw new Error('No rule found to delete.');
    
        files.saveFile();

        return rules;
    }

    // Listar regras de horários para atendimento
    function getRules() {
        return rules;
    }

    // Listar horários disponíveis dentro de um intervalo
    function getInterval(params) {
        if (validator.isEmpty(params.start))
            throw new Error('Missing "start".');

        if (validator.isEmpty(params.end))
            throw new Error('Missing "end".');

        start = formatDate(params.start);
        end = formatDate(params.end);

        return rules.filter((rule) => {
            ruleDay = formatDate(rule.day);

            return (start <= ruleDay) && (ruleDay <= end);
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