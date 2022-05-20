const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();
const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo );
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
       const siguiente = ticketControl.siguienteTicket();
       callback(siguiente);

       // TODO: Notificar que hay un nuevo ticeket pendiente por asignar
    })

}


module.exports = {
    socketController
}

