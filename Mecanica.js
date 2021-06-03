document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32, 38){
        console.log("salto");
        Salto();
    }
});

var imgDino, imgDino2, imgNube, imgObstaculo, imgSuelo, imgFondo;

function Imagenes(){
imgDino = new Image();
imgObstaculo = new Image();
imgFondo = new Image();
imgDino2 = new Image();

imgDino.src = "img/Dino.png";
imgObstaculo.src = 'img/Obstaculo.gif';
imgFondo.src = 'img/Fondo.jpg';
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
var nivel = {velocidad: 9, puntuacion:0, muerto: false};
var obstaculo = {x:ancho + 100, y: piso};
var fondog = {x:0, y:370};

function dibujaObstaculo(){
    context.drawImage(imgObstaculo, 0,0, 60, 64, obstaculo.x, obstaculo.y, 38, 75);
}


//funcion para determinar el movimiento que hara el obstaculo
function movObstaculo(){
    if(obstaculo.x < -100){
        obstaculo.x = ancho + 100;
    }else{
        obstaculo.x -= nivel.velocidad;
    }
}

function DibujandoFondo(){
    context.drawImage(imgFondo,fondog.x,0,607,317,0,0,800,400);
}

//movimiento de fondo (aun sin implementar)
function movFondo(){
    if(fondog.x > 800){
        fondog.x = 0;
    }else{
        fondog.x += nivel.velocidad
    }
}
function dibujadoDino(){
    context.drawImage(imgDino2,0,0,560,540,100,Dino.y,80,80);
}

function dibujadoDino2(){ 
    context.drawImage(imgDino,0,0,60,40,100,Dino.y,80,80);
}

function Salto(){
    Dino.saltando = true;
    Dino.Vy = Dino.salto;

}

function colision(){
    if(obstaculo.x >= 100 && obstaculo.x <= 160){
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

// bucle principal

var FPS = 30;
setInterval(function(){
    Actualizar();
},1000/FPS);

function Actualizar(){
    Borrado();
    Caida();
    colision();
    DibujandoFondo();
    movObstaculo();
    dibujaObstaculo();
    dibujadoDino();
    dibujadoDino2();
}