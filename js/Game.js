class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      console.log("hi")
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_image);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_image);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_image);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_image);
    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0,-displayHeight*4, displayWidth,displayHeight*5);

      //var display_position = 100;
      
      //index do array
      var index = 0;

      //posicao x e y do carro
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //adiciona 1 no index a cada loop
        index = index + 1 ;

        // posiciona os carros afastados um dos outros na direcao x
        x = x + 200;
        //usa a data do database para mandar os carros da direcao y
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          //camera.off()
          camera.position.x = displayWidth/2;
         camera.position.y = cars[index-1].y
       // camera.position.x = mouseX
       // camera.position.y = mouseY
        }
       
        // EXEMPLO DE FOR COM VAR IN 
          var obj = {a:1, b:2, c:3};

          //Para prop (propriedade) in obj (objeto) faça
          for (var prop in obj) {
            // ctrl+shift+k (para abrir o console no mozilla firefox)
            console.log("obj." + prop + " = " + obj[prop]);
          }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
