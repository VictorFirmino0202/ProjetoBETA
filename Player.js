class Player {
  constructor() {
    //Cria propriedades basicas dos jogadores 
    this.name = null;
    this.index = null;
    this.character = null;
    this.positionX = 0;
    this.positionY = 0;
    this.life = 10;
    this.ammogun = true;
    this.knife = false;
  }


  addPlayer() {
    //Adiciona os players no banco de dados
    var playerIndex = "players/player" + this.index;

    //Cria os players no mapa
    if (this.index === 1) {
      this.positionX = width / 2;
      this.positionY = height - 700;
    } else {
      this.positionX = width / 2;
      this.positionY = height - 20;
    }

    //Adiciona os players no banco de dados
    database.ref(playerIndex).set({
      name: this.name,
      character: this.character,
      positionX: this.positionX,
      positionY: this.positionY,
      life: this.life = 10,
      ammogun: this.ammogun = true,
      knife: this.knife = false
    });
  }


  static getPlayersInfo() { //Coloca valores dos players no banco de dados
    
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    })
  }


  update(ammogun, knife) { //Atualiza as informacoes dos players no banco de dados
   
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      character: this.character,
      life: this.life = 10,
      ammogun: ammogun,
      knife: knife
    })
  }


  getCount() { //Quantidade de players no jogo
    
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }


  updateCount(count) { //Atualiza a quantidade de players no banco de dados
    
    database.ref("/").update({
      playerCount: count
    });
  }
}
