var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running, monkey_collided;
var invisibleGround;
var banana, bug, bugImage, specialFruit,jungle ,jungleImage ,bananaImage, obstacle, obstacle1, obstacleImage, obstacle1Image, specialFruitImage, gameoverImage, restartImage;
var FoodGroup, obstacleGroup
var score
var gameover;
var restart;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("gorilla-removebg-preview.png");
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  specialFruitImage = loadImage("specialfruit-removebg-preview.png")
  obstacleImage = loadImage("obstacle1-removebg-preview.png");
  obstacle1Image = loadImage("obstacle2-removebg-preview.png")
  gameoverImage = loadImage("gameover-removebg-preview.png");
  restartImage = loadImage("reset-removebg-preview.png");
  bugImage = loadImage("bug-removebg-preview.png");
}

function setup() {
  createCanvas(576, 360);
  
 jungle = createSprite(200,100);
 jungle.addImage(jungleImage);
 jungle.scale = 2.0;

  monkey = createSprite(100, 273, 60, 90);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.13;
  
  gameover = createSprite(280, 130, 60, 20)
  gameover.addAnimation("gameover" , gameoverImage);
  gameover.scale = 0.5;
  
  restart = createSprite(285,220,80,20);
  restart.addAnimation("restart", restartImage);
  restart.scale = 0.2;
  
  invisibleGround = createSprite(290,320,580,15);
  invisibleGround.visible = false;
  
  FoodGroup = new Group();
  specialGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("circle",0,0,200);
  
  score = 0;
  
}


function draw() {
background(400);
  if (gameState===PLAY){
  monkey.collide(invisibleGround);
  spawnBananas();
    spawnBugs();
  spawnSpecialFruit();
  spawnObstacles();
  spawnObstacles1();
    
  survivalTime=Math.round(frameCount/frameRate())
    
  monkey.changeAnimation("running", monkey_running);
  
  if(keyDown("space") && monkey.y>= 160) {
      monkey.velocityY = -14;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  
    gameover.visible = false;
    restart.visible = false;
    
  jungle.velocityX = -3;
  
   if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
  }

   if (monkey.isTouching(specialGroup)){
    specialGroup.destroyEach();
    score = score+5;
  }
    
   if (monkey.isTouching(specialGroup)){
    specialGroup.destroyEach();
    score = score-10;
  }
    
    
   if (obstacleGroup.isTouching(monkey)){
     gameState=END;
   } 
  }
  else if(gameState===END){
     
    gameover.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){ 
    reset();
    }
    
   jungle.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   specialGroup.setVelocityXEach(0);
    
    monkey.changeAnimation("collided",monkey_collided);
    monkey.velocityY = 0;
   
    obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
    specialGroup.setLifetimeEach(-1);
  }
  monkey.collide(invisibleGround);
  
drawSprites();

  stroke("pink")
  fill("pink");
  textSize(20);
  var survivalTime=Math.round(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,95,30);
  
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Score: "+ score, 360,30);
  
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  specialGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  score = 0;
}

function spawnBananas(){
  
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,90,40,10);
    banana.y = Math.round(random(100, 230));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
     banana.depth = gameover.depth;
    gameover.depth = gameover.depth + 1;
    
     banana.depth = restart.depth;
    restart.depth = restart.depth + 1;
    
    
    FoodGroup.add(banana);
  }
} 

function spawnBugs(){
  
  if (frameCount % 272 === 0) {
    var bug = createSprite(600,90,40,10);
    bug.y = Math.round(random(100, 230));
    bug.addImage(bugImage);
    bug.scale = 0.20;
    bug.velocityX = -7;
    
    bug.lifetime = 200;
    
    bug.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bug.depth = gameover.depth;
    gameover.depth = gameover.depth + 1;
    
     bug.depth = restart.depth;
    restart.depth = restart.depth + 1;
    
    
    FoodGroup.add(bug);
  }
} 

function spawnSpecialFruit(){
  
  if (frameCount % 500 === 0) {
   var specialFruit = createSprite(600,60,40,10);
    specialFruit.addImage(specialFruitImage);
    specialFruit.scale = 0.1;
    specialFruit.velocityX = -10;
    
    specialFruit.lifetime = 200;
    
    specialFruit.depth = monkey.depth;
    specialFruit.depth = monkey.depth + 1;
    
    specialFruit.depth = gameover.depth;
    gameover.depth = gameover.depth + 1;
    
     specialFruit.depth = restart.depth;
    restart.depth = restart.depth + 1;
    
    specialGroup.add(specialFruit);
  }
}  


function spawnObstacles() {
  if(frameCount % 160 === 0) {
    obstacle = createSprite(560, 274, 80, 120);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.lifeTime = 200;
    obstacleGroup.add(obstacle);
    }
}

function spawnObstacles1() {
  if(frameCount % 363 === 0) {
    obstacle1 = createSprite(560, 279, 80, 120);
    obstacle1.addImage(obstacle1Image);
    obstacle1.scale = 0.13;
    obstacle1.velocityX = -(6 + 3*score/100);
    obstacle1.lifeTime = 200;
    obstacleGroup.add(obstacle1);
    }
}










