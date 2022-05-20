const path = require('path');
const fs = require('fs')

class Ticket {
    constructor( numero, escritorio ){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor(){
        this.ultimo     = 0;
        this.hoy        = new Date().getDate();
        this.tickets    = [];
        this.ultimos4   = [];

        this.init();
    }

    get toJson(){
        return{
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init(){
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            this.guardarDB();
        }
    }

    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify(this.toJson));
    }


    siguienteTicket(){
        this.ultimo += 1;
        const ticekt = new Ticket(this.ultimo, null);
        this.tickets.push( ticekt );
        
        this.guardarDB();

        return 'Ticket ' + ticekt.numero;
    }

    atenderTicket( escritorio ){
        if(this.tickets.length === 0){
            return null;
        }

        const ticekt = this.tickets.shift();//this.tickets[0]; // El shift selecciona el ultimo del arreglo y lo elimina
        ticekt.escritorio = escritorio;

        this.ultimos4.unshift(ticekt);

        if(this.ultimos4.length >4){
            this.ultimos4.splice(-1, 1);
        }

        this.guardarDB();

        return ticekt;
        
    }
}

module.exports = TicketControl;