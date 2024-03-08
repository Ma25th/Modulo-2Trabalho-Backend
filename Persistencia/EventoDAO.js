import conectar from "./Conexao.js";
import Evento from "../Modelo/Evento.js";
export default class EventoDAO{
    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (Sobre_Evento, Nome_Evento, Data_Hora, Local_Evento,
                Preco, Quantidade_ingresso) 
                         values (?, ?, ?, ?, ?, ?)`;
            const parametros = [
                evento.Sobre_Evento, 
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.Quantidade_ingresso,

            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            evento.id = resultados.insertId; 
        }
    }

    async atualizar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET Sobre_Evento = ?,
            Nome_Evento = ?, Data_Hora = ?, Local_Evento = ?,
            Preco = ?, Quantidade_ingresso = ?,  WHERE id = ?`;
            const parametros = [
                evento.Sobre_Evento, 
                evento.Nome_Evento,
                evento.Data_Hora,
                evento.Local_Evento,
                evento.Preco,
                evento.Quantidade_ingresso,
                evento.id
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [
                evento.id
            ]
            await conexao.execute(sql,parametros);
        }
    }
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){ 
            sql = `SELECT * FROM evento WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM evento WHERE id = ?`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        let listaEvento = [];
        for (const registro of registros){
            const evento = new Evento(
                registro.id,
                registro.Sobre_Evento,
                registro.Nome_Evento,
                registro.Data_Hora,
                registro.Local_Evento,
                registro.Preco,
                registro.Quantidade_ingresso,
            );
            listaEvento.push(evento);
        }
        return listaEvento;
    }
}