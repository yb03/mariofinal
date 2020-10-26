var bg
var groundimg
var ground
var marioimg
var jump
var obstacle
var brickimg
var obstacleGroup
var bricksGroup
var gameState="play"
var score=0
var gameover
var restart

function preload () 
{
bg=loadImage("bg.png")
groundimg=loadImage("ground2.png")
marioimg=loadAnimation("mario00.png", "mario01.png", "mario02.png", "mario03.png")
mariocollided=loadAnimation("collided.png")
die=loadSound("die.mp3")
jump=loadSound("jump.mp3");
obstacleimg=loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png", "obstacle4.png")
brickimg=loadImage("coin.png")
gameoverimg=loadImage("gameOver.png")
restartimg=loadImage("restart.png")
}
function setup()
{
createCanvas(1200,600)
ground=createSprite(600,550,1200,100)
ground.scale=2
ground.addImage("groundimg",groundimg)
ground.velocityX=-4
ground.x=ground.width/2
mario=createSprite(300, 440, 50,40)
mario.addAnimation("marioimg",marioimg)
mario.scale=2
mario.addAnimation("collided", mariocollided)
mario.setCollider("circle", 0,0, 15)
//mario.debug=true
bricksGroup=new Group()
obstacleGroup= new Group()
gameover=createSprite(600,300,50,50)
restart=createSprite(600,200,30,30)
restart.addImage("restartimg", restartimg)
gameover.addImage("gameoverimg", gameoverimg)
gameover.visible=false
restart.visible=false
}
function draw()
{
    background(bg);
     drawSprites()
     textSize(20)
     fill("BLACK")
     text("Score="+score, 800,100) 
if (gameState==="play"){

    if(keyDown("SPACE") && mario.y >= 400) { 
        mario.velocityY = -13 ; 
        jump.play(); 
    }
    mario.velocityY=mario.velocityY+1;
    if (ground.x<0)
    {
        ground.x=ground.width/2
    }
    for (var index = 0; index < bricksGroup.length; index++) {
       if(bricksGroup.get(index).isTouching(mario)){
        bricksGroup.get(index).remove();
        score=score+1;
       }

    }
    spawnObstacles();
    spawnBricks();
    if(obstacleGroup.isTouching(mario)){
        die.play()
    gameState="end"
    }
}
 else if(gameState==="end"){
    ground.velocityX=0;
    mario.velocityX=0;
    mario.velocityY=0;
 //    jump.play() 
    mario.changeAnimation("collided",mariocollided);
    obstacleGroup.setVelocityXEach(0);
    bricksGroup.setVelocityXEach(0);
    gameover.visible=true
    restart.visible=true
}
if(mousePressedOver(restart)){
    gameState="play"
    gameover.visible=false
    restart.visible=false
    obstacleGroup.destroyEach()
    bricksGroup.destroyEach()
    mario.changeAnimation("marioimg", marioimg)
    ground.velocityX=-4
    score=0

}
    mario.collide(ground)
}

function spawnObstacles()
{
    if (frameCount%100===0)
    {
    var obstacle=createSprite(1100, 440, 50,40)
    obstacle.velocityX=-4
    obstacle.addAnimation("obstacleimg", obstacleimg)
    obstacle.scale=1
    obstacle.setCollider("circle", 0,0, 20)
//obstacle.debug=false
    obstacleGroup.add(obstacle)



}
}
function spawnBricks()
{

    if (frameCount%80===0){
        var bricks=createSprite(600, 300, 50, 50)
        bricks.velocityX=-4
        bricks.addImage("brickimg", brickimg)
        bricks.scale=0.15
        bricks.y=random(400,300)
        bricksGroup.add(bricks)
    }
}
