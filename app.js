function initCanvas(){
    let ctx = document.getElementById('my_canvas').getContext('2d');
    let backgroundImage = new Image();
    let naveImage   = new Image(); 
    let enemigo1  = new Image(); 
    let enemigo2 = new Image(); 
    let misile = new Image();
    let notamuerte = new Image();
    
    backgroundImage.src = "./images/background-pic.png"; 
    naveImage.src       = "./images/spaceship-pic.png"; 
    
    
    enemigo1.src     = "./images/enemigo1 (1).png";
    enemigo2.src     = "./images/enemigo2 (1).png"; 

    misile.src = "./images/tear.png";
  
    notamuerte.src = "./images/notamuerte.png";
    
    let cW = ctx.canvas.width; 
    let cH = ctx.canvas.height;

    
    let enemyTemplate = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemigo1
        }
    }







    
    // formacion de los enemigos
    let enemies = [
                   new enemyTemplate({id: "MOSCA 1", x: 50, y: -60, w: 50, h: 30, image: enemigo2}),
                   new enemyTemplate({id: "CACA 1", x: 200, y: -60, w: 50, h: 30 }),
                   new enemyTemplate({id: "MOSCA 2", x: 320, y: -30, w: 80, h: 30, image: enemigo2 }),
                   new enemyTemplate({id: "CACA 2", x:80,  y:-170,  w:80,  h: 30}),
                   new enemyTemplate({id: "MOSCA 3", x:225,  y:-150,  w:50,  h: 30, image: enemigo2}),
                   new enemyTemplate({id: "CACA 3", x:350,  y:-200,  w:50,  h: 30}),
                   new enemyTemplate({id: "CACA 4", x:475,  y:-150,  w:50,  h: 30}),
                   new enemyTemplate({id: "MOSCA 4", x:570,  y:-150,  w:80,  h: 30, image: enemigo2}),
                   new enemyTemplate({id: "CACA 5", x:475,  y:-60,  w:50,  h: 30}),
                   new enemyTemplate({id: "CACA 6",x: 600, y: -30, w: 50, h: 30}),

                   // Segundo grupo de enemigos
                   new enemyTemplate({ id: "MOSCA 5", x: 100, y: -420, w: 50, h: 30, image: enemigo2 }),
                   new enemyTemplate({ id: "MOSCA 6", x: 225, y: -420, w: 50, h: 30, image: enemigo2 }),
                   new enemyTemplate({ id: "CACA 7", x: 350, y: -420, w: 80, h: 50, }),
                   new enemyTemplate({ id: "MOSCA 7", x: 100, y: -570, w: 80, h: 50, image: enemigo2 }),
                   new enemyTemplate({ id: "MOSCA 8", x: 255, y: -570, w: 50, h: 30, image: enemigo2 }),
                   new enemyTemplate({ id: "MOSCA 8", x: 350, y: -590, w: 50, h: 30,}),
                   new enemyTemplate({ id: "MOSCA 9", x: 475, y: -570, w: 50, h: 30, image: enemigo2 }),
                   new enemyTemplate({ id: "MOSCA 10", x: 500, y: -470, w: 80, h: 50, image: enemigo2 }),
                   new enemyTemplate({ id: "CACA 9", x: 475, y: -400, w: 50, h: 30, }),
                   new enemyTemplate({ id: "MOSCA 11", x: 600, y: -400, w: 50, h: 30, image: enemigo2 }),



                   new enemyTemplate({id: "CACA 10", x: 50, y: -860, w: 50, h: 30 }),
                   new enemyTemplate({id: "CACA 11", x: 200, y: -860, w: 50, h: 30 }),
                   new enemyTemplate({id: "MOSCA 12", x: 320, y: -830, w: 80, h: 30, image: enemigo2 }),
                   new enemyTemplate({id: "CACA 12", x:80,  y:-970,  w:80,  h: 30}),
                   new enemyTemplate({id: "MOSCA 13", x:225,  y:-950,  w:50,  h: 30, image: enemigo2}),
                   new enemyTemplate({id: "CACA 13", x:350,  y:-1000,  w:50,  h: 30}),
                   new enemyTemplate({id: "CACA 14", x:475,  y:-950,  w:50,  h: 30}),
                   new enemyTemplate({id: "MOSCA 14", x:570,  y:-950,  w:80,  h: 30, image: enemigo2}),
                   new enemyTemplate({id: "CACA 15", x:475,  y:-860,  w:50,  h: 30}),
                   new enemyTemplate({id: "CACA 16",x: 600, y: -830, w: 50, h: 30}),


                   
                  ];


                  //añadir mas oleadas

  //colisiones
    let renderEnemies = function (enemyList) {
        for (let i = 0; i < enemyList.length; i++) {
            console.log(enemyList[i]);
            ctx.drawImage(enemyList[i].image, enemyList[i].x, enemyList[i].y += .5, enemyList[i].w, enemyList[i].h);
            // Detects when ships hit lower level
            launcher.hitDetectLowerLevel(enemyList[i]);
        }
    }

    function Launcher(){  //ubicacion isaac
        
        this.y = 600,   
        this.x = cW*.5-25, 
        this.w = 80, 
        this.h = 100,   
        this.direccion, 
        this.bg="#87CEEB", 
        
        this.misiles = [];

         // Mensajes
         this.gameStatus = {
            over: false, 
            message: "",
            fillStyle: 'red',
            font: 'italic bold 80px Arial, sans-serif',
            
        }
         //ISAAC
        this.render = function () {
            if(this.direccion === 'left'){
                this.x-=5;
            } else if(this.direccion === 'right'){
                this.x+=5;
            }else if(this.direccion === "downArrow"){
                this.y+=5;
            }else if(this.direccion === "upArrow"){
                this.y-=5;
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(naveImage,this.x,this.y, 100, 90,); // isaac y bala en la misma posicion

            for(let i=0; i < this.misiles.length; i++){
                let m = this.misiles[i];
                ctx.drawImage(misile, m.x, m.y-=5, m.w = 20, m.h = 20); // DIRECCION BALA
                this.hitDetect(this.misiles[i],i);
                if(m.y <= 0){ // DESAPARECE BALA
                    this.misiles.splice(i,1); 
                }
            }
            // VICTORIA
            if (enemies.length === 0) {
                clearInterval(animateInterval); 
                document.querySelector("#victoria").innerHTML = `<img src="./images/victoria.jpg" alt="victoria">`
                ctx.fillStyle = '#efb810';
                ctx.font = this.gameStatus.font;
                ctx.fillText('VICTORIA', cW * .5 - 200, 400);
            }
        }
        // Detectar impacto de bala
        this.hitDetect = function (m, mi) {
            console.log('crush');
            for (let i = 0; i < enemies.length; i++) {
                let e = enemies[i];
                if(m.x+m.w >= e.x && 
                   m.x <= e.x+e.w && 
                   m.y >= e.y && 
                   m.y <= e.y+e.h){
                    this.misiles.splice(this.misiles[mi],1); // quita las balas
                    enemies.splice(i, 1); // quita los enemigos muertos
                    document.querySelector('.barra').innerHTML = e.id+ " " + "APLASTADA";  //METER AQUI EL SCORE
                }
            }
        }
        
        this.hitDetectLowerLevel = function(enemy){
            // si las cacas llegan
            if(enemy.y > 760){
                this.gameStatus.over = true;
                this.gameStatus.message = 'NOOB xD';
            }

            // Esto detecta un choque de la nave con enemigos
          
            if(enemy.id === 'enemy3'){
                //console.log(this.y);
                console.log(this.x);
            }
          
             //si te matan
            if ((enemy.y < this.y + 25 && enemy.y > this.y - 25) &&
                (enemy.x < this.x + 45 && enemy.x > this.x - 45)) { //colisiones
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'YOU DIED'
                    
                }

            if(this.gameStatus.over === true){  
                clearInterval(animateInterval); // Stop the game animation loop
                document.querySelector("#notamuerte").innerHTML = `<img src="./images/notamuerte.png" alt="notamuerte">`
                ctx.fillStyle = this.gameStatus.fillStyle; //  color to text
                ctx.font = this.gameStatus.font;
                // To show text on canvas
                ctx.fillText(this.gameStatus.message, cW * .5 - 200, 400); // text x , y

                document.getElementById("musica").stop() //cambiar a src
            }
        }
    }
    
    let launcher = new Launcher();
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    let animateInterval = setInterval(animate, 6);
    
    let left_btn  = document.getElementById('left_btn');  //boton por si acaso
    let right_btn = document.getElementById('right_btn'); //boton por si acaso
    let fire_btn  = document.getElementById('fire_btn'); 

   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 65) // left arrow
        {
         launcher.direccion = 'left';  
            if(launcher.x < cW*.2-130){
                launcher.x+=0;
                launcher.direccion = '';
            }
       }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 65)
        {
         launcher.x+=0;
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 68) // right arrow
        {
         launcher.direccion = 'right';
         if(launcher.x > cW-110){
            launcher.x-=0;
            launcher.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 68) // right arrow
        {
         launcher.x-=0;   
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 87) // up arrow
         {
           launcher.direccion = 'upArrow';  
           if(launcher.y < cH*.2-80){
              launcher.y += 0;
              launcher.direccion = '';
            }
         }
    });

    document.addEventListener('keyup', function(event){
         if(event.keyCode == 87) // up arrow
         {
           launcher.y -= 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 83) // down arrow
         {
           launcher.direccion = 'downArrow';  
          if(launcher.y > cH - 110){
            launcher.y -= 0;
            launcher.direccion = '';
           }
         }
    });
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 83) // down arrow
         {
           launcher.y += 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 82) // restart game R
         {
          location.reload();
         }
    });

    // botones de abajo
    
    //This code below fires bullets (balas)
    fire_btn.addEventListener('mousedown', function(event) {
        launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3, h: 10});
    });
    // Espacio para disparar
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3,h: 10});
        }
    });
};



