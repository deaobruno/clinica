TODO
- padronizar corretamente respostas de erros
- configurar inialização corretamente
- abstrair chamada de rotas
- validar inserção de regras repetidas
- gerar documentação
- aplicar TDD
- converter para TYpescrypt

EXEMPLOS

unique example
{
    "day": "01-01-2021",
    "intervals": [
        {
            "start": "09:00",
            "end": "10:00"
        },
        {
            "start": "11:00",
            "end": "12:00"
        }
    ],
    "flag": "u"
}

daily example
{
    "intervals": [
        {
            "start": "09:00",
            "end": "10:00"
        },
        {
            "start": "11:00",
            "end": "12:00"
        }
    ],
    "flag": "d",
    "limit": "17-01-2021"
}

weekly example
{
    "intervals": [
        {
            "start": "09:00",
            "end": "10:00"
        },
        {
            "start": "11:00",
            "end": "12:00"
        }
    ],
    "flag": "w",
    "limit": "15-02-2021",
    "weekdays": [1, 3]
}