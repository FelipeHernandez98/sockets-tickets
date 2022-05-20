const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');


const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;


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

btnAtender.addEventListener( 'click', () => {    
    
    
    /* socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    }); */

});