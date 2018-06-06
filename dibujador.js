/**
 *
 */
let cont = 0;
let cont2 = 0;
let longitudDeOnda;
let altoRendija;
let distancia;
let canvas;

let lon;
let an;
let dis;
let ctx;
let objeto;
let rendija;

function init(){
    cont = 0;
    cont2 = 0;
    longitudDeOnda = document.getElementById("input1");
    altoRendija = document.getElementById("input2");
    distancia = document.getElementById("input3");
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    lon = 1;
    an = 1;
    dis = 1;
    objeto = {
        ancho: 10,
        alto: canvas.height,
    };
    rendija = {
        ancho: objeto.ancho,
        alto: altoRendija.value,
    };
}


function calcular() {
    cont = 0;
    cont2 = 0;
    if (longitudDeOnda.value > 15 || longitudDeOnda.value < 1){
        alert("El valor de Longitud de onda debe ir entre 1 y 15 mm");
        return;
    }
    if(altoRendija.value > 20|| altoRendija < 1){
        alert("El valor del ancho de la rendija debe ir entre 1 y 20 mm");
        return;
    }
    if(distancia.value > 10|| distancia < 1){
        alert("El valor de la distancia a debe ir entre 1 y 10 m");
        return;
    }
    lon = longitudDeOnda.value;
    an = altoRendija.value;
    dis = distancia.value;
    rendija.alto = an;
}

function dibujar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Lineas de luz
    for (let i = 0; i < cont;i++){
        ctx.beginPath();
        ctx.moveTo(i*lon, 0);
        ctx.lineTo(i*lon,150);
        ctx.strokeStyle = "#FFAAAA";
        ctx.stroke();
    }
    if (cont * lon < 70){
        cont ++;
    }else{
        //Arcos de luz
        for (let i = 0; i < cont2;i++){
            ctx.beginPath();
            ctx.arc(80,75,i*lon,Math.PI/2,-Math.PI/2,true);
            ctx.strokeStyle = "#FFAAAA";
            ctx.stroke();
        }
        if (cont2*lon < 250) cont2 ++;
    }

    //Cota rendija
    ctx.beginPath();
    ctx.moveTo(40,50);
    ctx.lineTo(3,50);
    ctx.moveTo(40,50);
    ctx.lineTo(70,objeto.alto / 2 - rendija.alto / 2);
    ctx.strokeStyle = "#008000";
    ctx.stroke();

    //texto cota rendija
    ctx.beginPath();
    ctx.fillStyle = "#008000";
    ctx.font = "bold 10px arial";
    let anc =  "Ancho = " + an + "mm";
    ctx.fillText(anc,3,45);

    //Fondo vertical eje
    ctx.beginPath();
    ctx.rect(250, 0, 300, 300);
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();

    //Objeto
    ctx.beginPath();
    ctx.rect(70, 0, objeto.ancho, objeto.alto);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    //Rendija
    ctx.beginPath();
    ctx.rect(70, objeto.alto / 2 - rendija.alto / 2, rendija.ancho, rendija.alto);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

    //Cota de distancia
    ctx.beginPath();
    ctx.moveTo(80, 140);
    ctx.lineTo(250, 140);

    ctx.moveTo(244, 137);
    ctx.lineTo(250, 140);
    ctx.moveTo(244, 143);
    ctx.lineTo(250, 140);

    ctx.moveTo(86, 137);
    ctx.lineTo(80, 140);
    ctx.moveTo(86, 143);
    ctx.lineTo(80, 140);

    ctx.strokeStyle = "#0000FF";
    ctx.stroke();

    //Texto de cota distancia
    ctx.beginPath();
    ctx.fillStyle = "#0000FF";
    ctx.font = "bold 10px arial";
    let dist =  "Distancia = " + dis + "mts";
    ctx.fillText(dist,130,135);

    //Texto de cota longitud de onda
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.font = "bold 10px arial";
    let long =  "Longitud de Onda = " + lon + "mm";
    ctx.fillText(long,120,10);

    //Funcion sinc2
    for (let y = -80;y < 80;y++) {
        ctx.beginPath();
        if (y === 1){
            ctx.moveTo(180, 75);
        }else{
            ctx.moveTo( -70 * Math.pow(Math.sin( ((y-1) *40 * Math.PI * an)/(lon * dis *1000))/ ( ((y-1) * 40 * Math.PI * an)/(lon * dis * 1000)), 2 ) + 250,(y-1) + 75);
        }
        if(y === 0){
            ctx.lineTo(180,75);
        }else{
            ctx.lineTo( -70 * Math.pow(Math.sin( ((y) *40 * Math.PI * an)/(lon * dis *1000))/ ( ((y) * 40 * Math.PI * an)/(lon * dis * 1000)), 2 ) + 250,(y) + 75);
        }
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }

    //Cota punto de intensidad 0
    ctx.beginPath();
    ctx.moveTo(260,75);
    ctx.lineTo(260,75-lon*dis*25/an);
    ctx.moveTo(265,75);
    ctx.lineTo(245,75);
    ctx.moveTo(265,75);
    ctx.lineTo(245,75);
    ctx.moveTo(270,75-lon*dis*25/an);
    ctx.lineTo(250,75-lon*dis*25/an);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    //Texto de cota longitud de onda
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.font = "bold 8px arial";
    let ye =  "Y = " + lon*dis/an + "mm";
    ctx.fillText(ye,267,60);

    //Eje punteado
    for (let i = -1;i < 20;i++){
        ctx.beginPath();
        ctx.moveTo(i*20+15,75);
        ctx.lineTo(i*20+30,75);
        ctx.strokeStyle = "#008000";
        ctx.stroke();
    }
}
setInterval(dibujar, 30);
