const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();
const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketControl.siguienteTicket();
        callback(siguiente);

        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        // TODO: Notificar que hay un nuevo ticeket pendiente por asignar
    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escriorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
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

