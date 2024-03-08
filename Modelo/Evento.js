import EventoDAO from "../Persistencia/eventoDAO.js";

export default class Evento {
    #id;
    #Sobre_Evento;
    #Nome_Evento;
    #Data_Hora;
    #Local_Evento;
    #Preco;
    #Quantidade_ingresso;
    constructor(id = 0, Sobre_Evento = "", Nome_Evento = "", Data_Hora = "", Local_Evento = "", Preco = "", Quantidade_ingresso = "") {
        this.#id = id;
        this.#Sobre_Evento = Sobre_Evento;
        this.#Nome_Evento = Nome_Evento;
        this.#Data_Hora = Data_Hora;
        this.#Local_Evento = Local_Evento;
        this.#Preco = Preco;
        this.#Quantidade_ingresso = Quantidade_ingresso;
    }
    set id(novoid){
        this.#id = novoid;
    }

    get Sobre_Evento(){
        return this.#Sobre_Evento;
    }

    set Sobre_Evento(novoSobre_Evento){
        this.#Sobre_Evento = novoSobre_Evento;
    }

    get Nome_Evento(){
        return this.#Nome_Evento;
    }

    set Nome_Evento(novoNome_Evento){
        this.#Nome_Evento = novoNome_Evento;
    }

    get Data_Hora(){
        return this.#Data_Hora;
    }

    set Data_Hora(novoData_Hora){
        this.#Data_Hora = novoData_Hora;
    }

    get Local_Evento(){
        return this.#Local_Evento;
    }

    set Local_Evento(novoLocal_Evento){
        this.#Local_Evento = novoLocal_Evento;
    }

    get Preco(){
        return this.#Preco;
    }

    set Preco(novoPreco){
        this.#Preco = novoPreco;
    }

    get Quantidade_ingresso(){
        return this.#Quantidade_ingresso;
    }

    set Quantidade_ingresso(novoQuantidade_ingresso){
        this.#Quantidade_ingresso = novoQuantidade_ingresso;
    }
    async gravar(){
        const dao = new EventoDAO();
        await dao.gravar(this); 
    }

    async atualizar(){
        const dao = new EventoDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new EventoDAO();
        await dao.excluir(this.#id);
    }

    async consultar(termoDePesquisa){
        const dao = new EventoDAO();
        return await dao.consultar(termoDePesquisa);
    }
}