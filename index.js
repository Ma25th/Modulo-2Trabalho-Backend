import  Evento  from "./Modulo-2Trabalho-Backend/Modelo/Evento.js";
const evento = new Evento(4, "Prepare-se para uma viagem no tempo com este evento! A energia contagiante dos anos 50 e 60 invade a cidade com música, dança, carros antigos, roupas retrô e muito mais.", "Festival De Rock and Roll", "20:00", "Presidente Prudente", "100.00", "650");
evento.gravar().then(() =>{
    console.log("Cliente gravado com sucesso!");
}).catch((erro) => {
    console.log(erro);
});
evento.excluir().then(() => {
    console.log("Evento excluído com sucesso!");
}).catch((erro) => {
    console.log(erro);
});
