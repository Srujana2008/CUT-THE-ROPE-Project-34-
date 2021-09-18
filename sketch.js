const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;

var START = 0;
var END = 1;
var gameState = START;

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(1000,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8,
    //isStatic : true
  }

  
  
  ground =new Ground(250,height-5,width*2,20);    
  fruit = Bodies.circle(width/2,50,15,fruit_options);
  World.add(world,fruit);
  
  //bubble = createSprite(100,560,20,20);
  //bubble.addImage(bubble_img);
  //bubble.scale = 0.1;
  
  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(width/2-10,height-155,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  //higherground =new Ground(width/2,height-225,150,15);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(5,{x:390,y:100});
  rope2 = new Rope(5,{x:200,y:220});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  rope3 = new Rope(5,{x:width-320,y:100});
  rope4 = new Rope(5,{x:width-140,y:240});
  con3 = new Link(rope3,fruit);
  con4 = new Link(rope4,fruit);

  //btns
  button = createImg('cut_btn.png');
  button.position(370,100);
  button.size(50,50);
  button.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(200,200);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(width-370,100);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  button4 = createImg('cut_btn.png');
  button4.position(width-200,240);
  button4.size(50,50);
  button4.mouseClicked(drop4);

  blower = createImg("balloon.png");
  blower.position(width-200, 580);
  blower.size(200, 150);
  blower.mouseClicked(airBlow1);


  blower2 = createImg("balloon2.png");
  blower2.position(10, 580);
  blower2.size(200, 150);
  blower2.mouseClicked(airBlow2);
  

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);

  fill("yellow");
  textSize(50);
  stroke("black");
  strokeWeight(10);
  text("CUT THE ROPE", 330, 60);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  //higherground.show();
  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
   //remove_rope();
   //bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    gameState = END;
    
  }

  if(gameState === END){
    textSize(40);
    text("Yummy!", width/2-50, height/2-20);
    text("Thank You!", width/2-80, height/2+30);
  }
  
  /*if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -0.2;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
      fruit.position.x = bubble.position.x;
      fruit.position.y = bubble.position.y;
    }*/

  
}

function drop1()
{
  rope.break();
  con.dettach();
  con = null; 
}

function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function drop3()
{
  rope3.break();
  con3.dettach();
  con3 = null; 
}

function drop4()
{
  rope4.break();
  con4.dettach();
  con4 = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow1(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:-0.1, y:0});
}

function airBlow2(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.1, y:0});
}
