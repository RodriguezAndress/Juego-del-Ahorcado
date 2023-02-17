
let pala_secret;
let cant_aciertos = 0;
let cant_errores = 0;

const palabras = ['AVION','ZOMBIE','LIMITES','FIESTAS','AEROSOL','ORGANISMO','CINE','ESPACIO','CAMINO','CORAZON','HERRADURA' , ''];
console.log(palabras);
const btn = id ('jugar');
const imagen = id ('imagen');
const btn_letras = document.querySelectorAll( "#letras button" );
btn.addEventListener('click', iniciar);


function iniciar(event){
    imagen.src = 'img/ahorcado0.png';
    btn.disabled = true;
    resultado.innerHTML = '';
    cant_aciertos = 0;
    cant_errores = 0;

    let parrafo = id ('palabra_a_adivinar');
    parrafo.innerHTML = '';

    let cant_palabras = palabras.length;
    let valor_al_azar = obtener_random(0, cant_palabras);
    pala_secret = palabras[valor_al_azar];
    let cant_letras = pala_secret.length;
    console.log(pala_secret);

    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = false;
    }

    for(let i=0; i<cant_letras; i++){
        let span = document.createElement('span');
        parrafo.appendChild(span);
    } 
}

for(let i=0;i<btn_letras.length;i++){
    btn_letras[i].addEventListener('click', click_letras);
}

function click_letras(event){
    const spans = document.querySelectorAll('#palabra_a_adivinar span');
    const button = event.target;
    button.disabled = true;

    const letras = button.innerHTML.toUpperCase( );
    console.log('pala_secret', pala_secret)
    const palabra = pala_secret;
    let acerto = false;

    for(let i = 0; i < palabra.length; i ++){
        if(letras == palabra[i]) {
            spans[i].innerHTML = letras;
            cant_aciertos++;
            acerto = true;
        }
    }
    if( acerto == false ){
        cant_errores++;
        const source = `img/ahorcado${cant_errores}.png` ;
        imagen.src = source;
    }
    if( cant_errores == 8 ){
        id('resultado').innerHTML ="Perdiste, la palabra era " + palabra;
        game_over( );
    }
    else if( cant_aciertos == palabra.length ){
        id('resultado').innerHTML = "Genial, ¡Ganaste!";
        game_over( );
    }
    console.log("la letra" + letras + "en la palabra" + palabra + "existe?" + acerto);
}

function game_over( ){
    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = true;
    }

    btn.disabled = false;
}

game_over( );

    
function adicion(){
    
}
function new_palabra ( ){
    document.getElementById('uno');
    console.log('uno');
    const add = {
      value,
      palabras,
    };

    sessionStorage.setItem('palabras', JSON.stringify(add));
}