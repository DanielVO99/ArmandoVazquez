document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        console.log("saltar");
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
imgObstaculo.src = 'img/Obstaculo.png';
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

function DibujandoFondo(){
    context.drawImage(imgFondo,0,0,607,317,0,0,800,400);
}

function dibujadoDino(){
    context.drawImage(imgDino,0,0,560,540,100,Dino.y,80,80);
}

function dibujadoDino2(){ 
    context.drawImage(imgDino2,0,0,560,540,100,Dino.y,80,80);
}



function Salto(){
    Dino.saltando = true;
    Dino.Vy = Dino.salto;

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

// bucle pirncipal

var FPS = 60;
setInterval(function(){
    Actualizar();
},1000/FPS);

function Actualizar(){
    Borrado();
    Caida();
    DibujandoFondo();
    dibujadoDino();
    dibujadoDino2();
}