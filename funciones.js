function id(str){
    return document.getElementById(str);
}
function obtener_random(num_min, num_max){
    let amplitud_valores = num_max - num_min;
    let valor_al_azar = Math.floor(Math.random( )* amplitud_valores) + num_min;
    return valor_al_azar;
}
