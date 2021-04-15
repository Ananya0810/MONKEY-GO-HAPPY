var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var spawnObstacles
var score

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 400);
 survivalTime=0
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10)
  ground.velocityX=-4
  ground.x= ground.width/2
  console.log(ground.x)
    
  obstacle= createSprite()
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  obstaclesGroup = new Group();
  foodGroup= new Group()
  

  score=0
  
}


function draw() {
  background(255);

   stroke("blue")
  fill("white")
textSize("20")
  text("score;"+ score,500,50)
  
  if( obstaclesGroup.isTouching(monkey)){
    
    ground.velocityX=0
    ground.velocityY=0
    
    obstaclesGroup.setVelocityXEach(0)
    foodGroup.setVelocityXEach(0)
    
    obstaclesGroup.setLifetimeEach(-1)
    foodGroup.setLifetimeEach(-1)
  }
  
   stroke("red")
textSize("20")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime;"+ survivalTime,100,50)
    
    if(keyDown("space") && monkey.y >= 159) {
     monkey.velocityY = -12;
     
    }
     monkey.velocityY = monkey.velocityY + 0.8
  
   
   monkey.collide(invisibleGround)
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
 
    
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") ) {
     monkey.velocityY = -12;
      
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground)
  spawnFood()
    spawnObstacles()
   
 drawSprites()

  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
  }
  else if (gameState === END) {
  
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
  monkey.velocityY = 0;
    
    
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
   
  
}


 drawSprites()
}
   
function spawnObstacles(){
  if(frameCount % 100=== 0 ){
    
 
  
  obstacle = createSprite(800,320,10,40)
  obstacle.velocityX= -6
    obstacle.addImage(obstacleImage)
   obstacle.scale=0.15
    
    obstacle.lifeTime=300
    
    obstaclesGroup.add(obstacle);
  }
  
}
 
function spawnFood(){
if(frameCount % 100=== 0 ){
    
 
  
banana = createSprite(600,250,40,10)
  banana.y=random(120,200)
 banana.velocityX= -5
    banana.addImage(bananaImage)
   banana.scale=0.15
    
    banana.lifeTime=300
  monkey.depth=banana.depth+1
    
   foodGroup.add(banana);
  }
  
  
}
