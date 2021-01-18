## Descrição

Projeto de gerenciamento do cadastro de horários de atendimentos de uma clínica.
Desenvolvido como etapa de teste para processo seletivo da Suno Research.

## Informações

Para rodar o projeto, usar o comando

```
npm run dev
```

## Exemplos

/POST create (unique)
{
    "request":{
        "method":"POST",
        "header":[],
        "body":{
            "mode":"raw",
            "raw":"{
                "day": "20-01-2021",
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
            }",
            "options":{
                "raw":{
                    "language":"json"
                }
            }
        },
        "url":"localhost:8000/create"
    }
}

/POST create (daily)
{
    "request":{
        "method":"POST",
        "header":[],
        "body":{
            "mode":"raw",
            "raw":"{
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
                "limit": "22-01-2021"
            }",
            "options":{
                "raw":{
                    "language":"json"
                }
            }
        },
        "url":"localhost:8000/create"
    },
}

/POST create (weekly)
{
    "request":{
        "method":"POST",
        "header":[],
        "body":{
            "mode":"raw",
            "raw":"{
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
                "limit": "20-02-2021",
                "weekdays": [1, 3]
            }",
            "options":{
                "raw":{
                    "language":"json"
                }
            }
        },
        "url":"localhost:8000/create"
    },
}

/GET list
{
    "request":{
        "method":"GET",
        "header":[],
        "url":"localhost:8000/list"
    }
}

/POST interval
{
    "request":{
        "method":"POST",
        "header":[],
        "body":{
            "mode":"raw",
            "raw":"{
                "start": "25-01-2021",
                "end": "03-02-2021"
            }",
            "options":{
                "raw":{
                    "language":"json"
                }
            }
        },
        "url":"localhost:8000/interval"
    }
}

/DELETE delete
{
    "request":{
        "method":"DELETE",
        "header":[],
        "url":"localhost:8000/delete/1"
    }
}

OBS: Os exemplos podem ser importados pelo seguinte link do Postman:
https://www.getpostman.com/collections/ec0f8274022a1d585017