TODO
- corrigir validações
- implementar gerenciador de erros
- aplicar carregamento único do express
- configurar inialização corretamente
- abstrair validação
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
01

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
15, 16, 17

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
18, 20, 25, 27, 1, 3, 8, 10, 15