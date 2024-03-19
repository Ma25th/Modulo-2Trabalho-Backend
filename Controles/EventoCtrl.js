import Evento from "../Modelo/Evento.js";
export default class EventoCtrl{
    gravar(requisicao, resposta){
        resposta.type('application/json');  
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const Sobre_Evento = dados.Sobre_Evento;
            const Nome_Evento = dados.Nome_Evento;
            const Data_Hora = dados.Data_Hora;
            const Local_Evento = dados.Local_Evento;
            const Preco = dados.Preco;
            const Quantidade_ingresso = dados.Quantidade_ingresso;
            if (Sobre_Evento && Nome_Evento && Data_Hora && Local_Evento && Preco && Quantidade_ingresso){
                const evento = new Evento(0, Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento, Preco, Quantidade_ingresso);
                evento.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento gravado com sucesso!",
                        "codigo_Evento": evento.codigo
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o Evento! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do Evento, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um Evento!"
            })
        }
    }
    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const codigo = requisicao.params.codigo;
            const Sobre_Evento = dados.Sobre_Evento || null;
            const Nome_Evento = dados.Nome_Evento || null; 
            const Data_Hora = dados.Data_Hora || null;
            const Local_Evento = dados.Local_Evento || null;
            const Preco = dados.Preco || null;
            const Quantidade_ingresso = dados.Quantidade_ingresso || 0;
            if (codigo && codigo > 0 && Sobre_Evento && Nome_Evento && Data_Hora && Local_Evento && Preco && Quantidade_ingresso)
            {
                const evento = new Evento(codigo, Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento, Preco, Quantidade_ingresso);
                evento.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o Evento! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do Evento, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um Evento!"
            })
        }
    }
    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            
            const codigo = requisicao.params.codigo;
            if (codigo && codigo > 0){
                const evento = new Evento(codigo);
                evento.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Evento excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o Evento! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do Evento que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um Evento!"
            })
        }
    }
    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa)
            .then((eventos)=>{
                resposta.status(200);
                resposta.json(eventos);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os Eventos! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os Eventos!"
            })
        }
    }

}