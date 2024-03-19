import express from "express";
import rotaEvento from "./Rotas/rotaEvento.js";
import  Evento  from "../Modulo-2Trabalho-Backend8/Modelo/Evento.js";
const evento = new Evento(4, "Prepare-se para uma viagem no tempo com este evento! A energia contagiante dos anos 50 e 60 invade a cidade com música, dança, carros antigos, roupas retrô e muito mais.", "Festival De Rock and Roll", "20:00", "Presidente Prudente", "100.00", "650");
evento.gravar().then(() =>{
    console.log("Evento gravado!");
}).catch((erro) => {
    console.log(erro);
});
evento.excluir().then(() => {
    console.log("Evento excluído!");
}).catch((erro) => {
    console.log(erro);
});
const host = '0.0.0.0';
const porta = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/eventos',rotaEvento);
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
