//Variables
let pala_secret;
let cant_aciertos = 0;
let cant_errores = 0;
const btn = document.querySelector("#jugar");
const btn2 = document.querySelector("#Agregar");
const imagen = document.querySelector("#imagen");
const btn_letras = document.querySelectorAll("#letras button");
const resultado = document.getElementById("resultado");
let palabras = ["AVION", "ZOMBIE", "LIMITES", "FIESTAS", "AEROSOL", "ORGANISMO", "CINE", "ESPACIO", "CAMINO", "CORAZON", "HERRADURA"];

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  if (formulario) {
    formulario.addEventListener("submit", nuevaPalabra);
  }

  if (btn) {
    btn.addEventListener("click", iniciar);
  }

  if (btn2){
    btn2.addEventListener("click", nuevaPalabra);
  }

  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].addEventListener("click", click_letras);
  }
});

//Funciones
function iniciar(e) {
  e.preventDefault();

  imagen.src = "img/ahorcado0.png";
  btn.disabled = true;
  resultado.innerHTML = "";
  cant_aciertos = 0;
  cant_errores = 0;

  let palabrasLocales = localStorage.getItem("palabras");
  palabras = palabrasLocales ? JSON.parse(palabrasLocales) : palabras;

  sincronizarStorage();

  let cant_palabras = palabras.length;
  let valor_al_azar = obtener_random(0, cant_palabras);
  pala_secret = palabras[valor_al_azar];
  let cant_letras = pala_secret.length;

  console.log(pala_secret);

  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }

  let parrafo = document.querySelector("#palabra_a_adivinar");
  parrafo.innerHTML = "";

  for (let i = 0; i < cant_letras; i++) {
    let span = document.createElement("span");
    parrafo.appendChild(span);
  }
}

function click_letras(event) {
  const spans = document.querySelectorAll("#palabra_a_adivinar span");
  const button = event.target;
  button.disabled = true;

  const letras = button.innerHTML.toUpperCase();
  let acerto = false;
  let palabra = pala_secret;

  for (let i = 0; i < palabra.length; i++) {
    if (letras == palabra[i]) {
      spans[i].innerHTML = letras;
      cant_aciertos++;
      acerto = true;
    }
  }
  if (!acerto) {
    cant_errores++;
    const source = `img/ahorcado${cant_errores}.png`;
    imagen.src = source;
  }
  if (cant_errores == 8) {
    resultado.innerHTML = "Perdiste, la palabra era " + palabra;
    game_over();
  } else if (cant_aciertos == palabra.length) {
    resultado.innerHTML = "Genial, ¡Ganaste!";
    game_over();
  }
}

function game_over() {
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }
  btn.disabled = false;
}

function nuevaPalabra(e) {
  e.preventDefault();

  const nuevaPalabraInput = document.querySelector("#uno").value.trim().toUpperCase();

  let palabrasLocales = localStorage.getItem("palabras");
  palabras = palabrasLocales ? JSON.parse(palabrasLocales) : palabras;

  palabras.push(nuevaPalabraInput);

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("palabras", JSON.stringify(palabras));
}

function obtener_random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
console.log(localStorage);
