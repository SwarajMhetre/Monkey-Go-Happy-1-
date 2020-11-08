var PLAY = 0;
var END = 1;
var gameState = PLAY;

var monkey , monkey_running,monkey_collided;
var hunter,hunterIMG;
var banana ,bananaImage, obstacle, obstacleImage;
var FruitGroup, obstacleGroup;
var go,goImg;
var restart,resetImg;

var Ground,backGroundImg;

var bananaScore,st;

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadAnimation("monkey_collided.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backGroundImg = loadImage("bg.png") 
  
  goImg=loadImage("oops.png");
  resetImg=loadImage("reset-1.png")
}



function setup() {
     
  createCanvas(570,450);
  
Ground = createSprite(330,430,10,600);
Ground.addImage(backGroundImg);
Ground.scale =1
Ground.velocityX=-6;
  
  monkey = createSprite(150,325,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.15;
// monkey.debug = true;
  
  ground= createSprite(42,448,1000);
  ground.visible = false;
  
  go = createSprite(270,100);
    go.addImage(goImg);
    go.scale=0.7;
  go.visible=false;
    
    restart = createSprite(270,230);
    restart.addImage(resetImg);
    restart.scale = 0.5;
  restart.visible=false;
  
  bananaScore = 0;
 st = 0;
  
  fruitGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  background("cyan")
  
 if (gameState===PLAY){ 
       bananas();
       obstacles();
   st = Math.ceil(frameCount/frameRate())
   
   if(fruitGroup.isTouching(monkey)){
      fruitGroup.destroyEach(); 
     bananaScore++;
   }
  
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
   
  if(keyDown("space")){    
      monkey.velocityY=-10;
  }
  
  if (Ground.x < 0){
      Ground.x = Ground.width/2;
    } 
   
   if(obstacleGroup.isTouching(monkey)){
       gameState = END;
     
   }
 }
  
  if (gameState === END){
    
   go.visible=true;
    restart.visible = true;
        
       monkey.changeAnimation("collided",monkey_collided);
       monkey.scale=0.17;
  
       
    fruitGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
           Ground.velocityX = 0;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  monkey.collide(ground);
  

drawSprites(); 
  
   fill("black");
  stroke ("black")
  textSize(15)
  text("BANANAS COLLECTED = " +bananaScore,10,20);
  
  text ("Dist from the Zoo (In metre) = "+st,330,20)
}



function bananas(){
  
  if (frameCount%140===0){
             
    banana = createSprite(570,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(150,300));
    banana.scale = 0.1;
    
    banana.velocityX = -7;
    banana.lifetime = 200; 
    
    fruitGroup.add(banana)
  }
}
   
function obstacles(){
  
  if (frameCount%100===0){
    
    obstacle = createSprite(570,360,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale = 0.18 ;
    obstacle.lifetime = 200
//  obstacle.debug = true;
    obstacle.rotation = 5;
   
    obstacle.setCollider("rectangle",0,0,380,380);
    
    obstacleGroup.add(obstacle);    
  }
}
function reset(){
  
     gameState = PLAY;
  
     fruitGroup.destroyEach();
     obstacleGroup.destroyEach();
  
restart.visible = false;
go.visible=false;
  
  Ground.velocityX = -6;
  
  monkey.x=150;
  monkey.y=325;
  
    monkey.changeAnimation("monkey",monkey_running);
  
  bananaScore=0;
  st = 0;
     
}


