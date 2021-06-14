document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32 || evento.keyCode == 38){
        console.log("salto");
        if(nivel.muerto == false){
            Salto();
        }
       
    }
});

var imgDino, imgDino2, imgNube, imgObstaculo, imgSuelo, imgFondog;

function Imagenes(){
imgDino = new Image();
imgObstaculo = new Image();
//imgFondo = new Image();
imgFondog = new Image();
imgDino2 = new Image();

imgDino.src = "img/Dino.png";
imgObstaculo.src = 'img/Obstaculo.gif';
//imgFondo.src = 'img/Fondo.jpg';
imgFondog.src = 'img/Fondog.jpg';
imgDino2.src = 'img/Dino2.png'
}




var ancho = 800;
var alto = 400;
var canvas,context;

function inicializa(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    Imagenes();
}

function Borrado(){
    canvas.width = ancho;
    canvas.heigth = alto;
}

var piso = 275;
var Dino = {y:piso, Vy:0, gravedad:2, salto:25, Vymax:9, saltando: false};
var nivel = {velocidad: 13, puntuacion:0, muerto: false};
var obstaculo = {x:ancho + 100, y: piso};
var fondog = {x:0, y:0};

function dibujaObstaculo(){

    context.drawImage(imgObstaculo, 0,0, 64, 64, obstaculo.x, obstaculo.y, 60, 75);

}


//funcion para determinar el movimiento que hara el obstaculo
function movObstaculo(){
    if(obstaculo.x < -50){
        obstaculo.x = ancho + 100;
        nivel.puntuacion++;
    }else{
        obstaculo.x -= nivel.velocidad;
    }
}

function DibujandoFondo(){
    context.drawImage(imgFondog,fondog.x,0,1908,512,0,fondog.y,800,400);
}


function movFondo(){
    if(fondog.x > 1908){
        fondog.x = 0;
    }else{
        fondog.x += nivel.velocidad
    }
}

function dibujadoDino(){
    context.drawImage(imgDino2,0,0,480,480,100,Dino.y,80,80);
    context.drawImage(imgDino,0,0,480,480,100,Dino.y,80,80);
}



function Salto(){
    if(Dino.y=piso){
    Dino.saltando = true;
    Dino.Vy = Dino.salto;
    }

}

function colision(){
    if(obstaculo.x >= 100 && obstaculo.x <= 170){
        if(Dino.y >= piso){
            nivel.muerto = true;
            nivel.velocidad = 0;
        }
    }
}

function Caida(){
if(Dino.saltando == true){
    
    if(Dino.y - Dino.Vy-Dino.gravedad> piso){
        Dino.saltando == false;
        Dino.Vy = 0;
        Dino.y = piso;
    }else{

        Dino.Vy -= Dino.gravedad;
        Dino.y -= Dino.Vy;
    }
}
}

function Score(){
    context.fillStyle = '#F9FB22';
    context.fillRect(725, 15, 60, 40);

    context.font = "40px Impact";
    context.fillStyle = "#000000";
    context.fillText(`${nivel.puntuacion}`, 740, 50);

    if(nivel.muerto == true){
        context.fillStyle = '#F9FB22';
        context.fillRect(84, 100, 630, 110);

        context.font = "60px Inpact";
        context.fillStyle = "#000000";
        context.fillText('FIN DEL JUEGO', 150, 150); 
        context.fillText(`TU PUNTUACION ES: ${nivel.puntuacion}`, 80, 200); 
    }
}

// bucle principal
var FPS = 30;
setInterval(function(){
    Actualizar();
},1000/FPS);

function Actualizar(){
    Borrado();
    Caida();
    colision();
    movFondo();
    DibujandoFondo();
    movObstaculo();
    dibujaObstaculo();
    dibujadoDino();
    Score();
}