class Game {
    constructor() {
        this.resetTitle = createElement("h2")
        this.resetButton = createButton("");
        this.knife = false;
        this.ammoload = true;
        this.animationsLoad = false;
    }


    getState() { //Add estado de jogo no banco de dados
        
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }


    update(state) { //Atualiza o estado de jogo no banco de dados
    
        database.ref("/").update({
            gameState: state
        });
    }


    start() {//Cria elementos depois de clicar no botao ``jogar``

        //Chama o UI
        form = new Form();
        form.display();
  
        //Chama os players
        player = new Player();
        playerCount = player.getCount() || 0;

        equipamentos = new Equipaments();

        //Cria o sprite dos players no jogo
        hero1 = createSprite(width / 2, height);
        hero1.shapeColor = "blue";
        hero1.scale = 0.1;
        
        hero2 = createSprite(width / 2, height);
        hero2.shapeColor = "red";
        hero2.scale = 0.1;
        
        heros = [hero1, hero2];

        

    }


    handleAnimations(allPlayers) { //Add animacoes de movimento para cada personagem

        if (!this.animationsLoad) {
            var players = Object.values(allPlayers);

            if (players[0].character == 1) {
                heros[0].addAnimation("stopped", warriorStop);
                heros[0].addAnimation("walking", warriorWalking);
                heros[0].addAnimation("back", warriorBack);
            } else if (players[0].character == 2) {
                heros[0].addAnimation("stopped", assassinStop);
                heros[0].addAnimation("walking", assassinWalking);
                heros[0].addAnimation("back", assassinBack);
            } else if (players[0].character == 3) {
                heros[0].addAnimation("stopped", scientistStop);
                heros[0].addAnimation("walking", scientistWalking);
                heros[0].addAnimation("back", scientistBack);
            } else if (players[0].character == 4) {
                heros[0].addAnimation("stopped", robotStop);
                heros[0].addAnimation("walking", robotWalking);
                heros[0].addAnimation("back", robotBack);
            }


            if (players[1].character == 1) {
                heros[1].addAnimation("stopped", warriorStop);
                heros[1].addAnimation("walking", warriorWalking);
                heros[1].addAnimation("back", warriorBack);
            } else if (players[1].character == 2) {
                heros[1].addAnimation("stopped", assassinStop);
                heros[1].addAnimation("walking", assassinWalking);
                heros[1].addAnimation("back", assassinBack);
            } else if (players[1].character == 3) {
                heros[1].addAnimation("stopped", scientistStop);
                heros[1].addAnimation("walking", scientistWalking);
                heros[1].addAnimation("back", scientistBack);
            } else if (players[1].character == 4) {
                heros[1].addAnimation("stopped", robotStop);
                heros[1].addAnimation("walking", robotWalking);
                heros[1].addAnimation("back", robotBack);
            }
            this.animationsLoad = true;
        }
    }


    handleElements() { //Cria elementos do botao de reset
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");

        this.resetTitle.html("Reiniciar Jogo");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 230, 30);

        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 280, 100);
    }


    play() { //Estado (jogando)

        //chama os elementos da tela
        this.handleElements();
        this.handleResetButton();
        

        Player.getPlayersInfo();

        equipamentos.selectEquipament();

        //Muda as animacoes dos personagens ao andar
        if (allPlayers !== undefined) {

            var index = 0;
            for (var plr in allPlayers) {

                index += 1;
                var x = allPlayers[plr].positionX;
                var y = height - allPlayers[plr].positionY;
                var caracter = allPlayers[plr].character;

                this.handleAnimations(allPlayers);
                if (heros[index - 1].position.x == x && heros[index - 1].position.y == y) {
                    heros[index - 1].changeAnimation("stopped");
                }
                else {
                    if (heros[index - 1].position.y > y){

                        heros[index - 1].changeAnimation("back");
                    }
                    else if (heros[index - 1].position.x > x){

                        heros[index - 1].changeAnimation("walking");
                        heros[index - 1].mirrorX(-1);

                    }  else {
                        heros[index - 1].changeAnimation("walking");
                        heros[index - 1].mirrorX(1);
                    } 
                }
                

                heros[index - 1].position.x = x;
                heros[index - 1].position.y = y;

                
                 var respawnAmmo = true;
                 if (respawnAmmo == true) {
                    //ammoPoint();
                    if (heros[index - 1].isTouching(ammoPointP) && this.ammoload == false) {

                    this.ammoload = true;
                    ammoPointP.visible = false;
                    respawnAmmo = false;
                    console.log("bala recarregada");

                    }
 
                } else if (frameCount % 2000 === 0) {
                    
                    ammoPointP.visible = true;
                    respawnAmmo = true;
             
                } 
                      

                //Cria a camera sob os personagens
                 if (index === player.index) {
                         if (x > 300 && x < ((1150 * width) / 1496))
                            camera.position.y = y;
                            camera.position.x = x;
                            camera.zoom = 2;
                            //arrumar camera Y ao chegar no limite do Y
                        
                }
            }
            this.handlePlayerControls();
            drawSprites();
        }


    }

    setBank() { //valores iniciais do banco de dados
        database.ref("/").set({
            gameState: 0,
            playerCount: 0,
            players: {},
        });
    }


    handlePlayerControls() {  //Controles dos players 
        if (keyDown("w")) {
            if (player.positionY != undefined) {
                player.positionY += Math.round((10 * height) / 1080);
                if (player.positionY > height) {
                    player.positionY = height;

                }
                player.update(this.ammoload, this.knife);

            }

        }

        if (keyDown("d")) {
            if (player.positionX != undefined) {
                player.positionX += Math.round((10 * width) / 1080);
                if (player.positionX > width) {
                    player.positionX = width;
                }
                
                //console.log(player)
                player.update(this.ammoload, this.knife);
            }

        }

        if (keyDown("a")) {
            if (player.positionX != undefined) {
                player.positionX -= Math.round((10 * width) / 1080);
                if (player.positionX < 0) {
                    player.positionX = 0;
                }

                player.update(this.ammoload, this.knife);
            }
        }

        if (keyDown("s")) {
            if (player.positionY != undefined) {
                player.positionY -= Math.round((10 * height) / 1080);
                if (player.positionY < 0) {
                    player.positionY = 0;
                }

                player.update(this.ammoload, this.knife);
            }
        }

        if (this.ammoload == true) {
            if (keyIsDown(32)) {
                console.log("atirou");
                this.ammoload = false;
                this.knife = true;
                player.update(this.ammoload, this.knife);
            }

        } else {
            console.log("semMuniçao");
            //console.log(this.knife)
        }
    }


    handleResetButton() {  //Botao de Reset apos ser precionado (banco de dados)
        this.resetButton.mouseClicked(() => {
            database.ref("/").set({
                gameState: 0,
                playerCount: 0,
                players: {},
            });
            window.location.reload();
        })
    }

    
    ammoPoint() { //cria ponto de municao
        ammoPointP = createSprite(width / 2, height / 2, 10, 10);
        ammoPointP.shapeColor = "purple";
    }
}

    



