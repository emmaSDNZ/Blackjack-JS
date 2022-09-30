/*
2C -> CLUBS
2D -> DIAMINDS
2H -> HEARTS
2S -> SPADES
*/

let deck             = [];
const tipos          = ['C','D','H','S'];
const especiales     = ['A','J','Q','K'];
let puntosJugador    = 0;
let puntosComputadora= 0;

//referencias de HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador      = document.querySelector('#jugador-cartas')
const divCartasComputadora  = document.querySelector('#computadora-cartas')

const puntosHTML = document.querySelectorAll('small')

//console.log(btnPedir)


//funcion para las cartas
const creatDeck = ()=>{

    for(let i = 2; i <= 10; i++) {
        for(let tipo of tipos){
            deck.push(i + tipo );
        }
    }

    for (let tipo of tipos){
        for (let especial of especiales){
            deck.push(especial + tipo);
        }
    }  

    deck = _.shuffle(deck);

    

    return deck;
}

creatDeck()

//funcion que me permite pedir una carta
const pedirCarta = () => {
    
    if(deck.length === 0) throw 'No hay mas cartas en el deck'

    let carta = deck.pop()


    return carta
}

pedirCarta()


//funcion: valor de carta
const valorCarta = (carta) => {

    let valor = carta.substring(0, carta.length - 1);
    
   return (isNaN(valor)) ? ( valor === 'A' ? 11 : 10 ) : (valor * 1);
    
}

//computadora


const turnoComputadora = (puntosMinimos)=>{
    
    do {
        const carta = pedirCarta()

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        //creo la carta
        // <img class='carta' src="assets/cartas/2C.png"/>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
    
        //renderizo la carta
        divCartasComputadora.append(imgCarta);
        
        if( puntosMinimos > 21){
            break;
        }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

}


//EVENTOS

btnPedir.addEventListener('click', ()=>{

    const carta = pedirCarta()

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    //creo la carta
    // <img class='carta' src="assets/cartas/2C.png"/>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    
    //renderizo la carta
    divCartasJugador.append(imgCarta);
    
    if( puntosJugador >  21 ){

        console.warn('Perdiste')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoComputadora(puntosJugador);
        
    } else if (puntosJugador === 21) {
        console.warn('21, genial')
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }
    console.log(imgCarta)
    console.log(puntosJugador)
   
})

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador )
} )