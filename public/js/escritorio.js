const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {

    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', ( ultimo )=>{
    //lblNuevoTicket.innerText = 'Ticket ' + ultimo;
})

socket.on('tickets-pendientes', ( ticketsPendientes )=>{
    if(ticketsPendientes === 0){
        lblPendientes.style.display = 'none';
    }
    lblPendientes.innerText = ticketsPendientes;

});

btnAtender.addEventListener( 'click', () => {    
    
    socket.emit('atender-ticket', { escritorio }, ( {ok , ticket, msg} )=>{
        if(!ok){
            lblTicket.innerText = 'Nadie.';
            return divAlert.style.display = '';
        }

        let numero = ticket.numero;
        lblTicket.innerText = `Ticket ${numero}`;

    })
    /* socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    }); */

});