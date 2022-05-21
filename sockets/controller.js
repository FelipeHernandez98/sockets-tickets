const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();
const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo );
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
       const siguiente = ticketControl.siguienteTicket();
       callback(siguiente);

       // TODO: Notificar que hay un nuevo ticeket pendiente por asignar
    })

    socket.on('atender-ticket', ({escritorio}, callback) =>{
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escriorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        if(!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            })
        }
    });

}


module.exports = {
    socketController
}

