
var alien, aliengrp
var bullet, bulletgrp
var pellet, pelletgrp

var wave=3
var PLAY=1
var END=0
var PREGAME=0.5
var gameState=0.5
var count=wave*10

function preload(){
	warshipimg=loadImage("warship.png")
	bulletimg=loadImage("bullet.png")
	greenImg= loadImage("pellet-green.png")
	buleImg= loadImage("pellet-blue.png")
	pinkImg= loadImage("pellet-pink.png")
	alineImg=loadImage("aline ship.png")
	spaceImg=loadImage("space.jpg")
	
}

function setup(){
	canvas=createCanvas(800, 600)
	warship= createSprite(40, 200, 20,30)
	warship.addImage(warshipimg)
	warship.scale=0.5	
	aliengrp=new Group()
	bulletgrp=new Group()
	pelletgrp=new Group()

}
function draw(){
	background("pink")

	if(gameState===0.5){
	    stroke("0")
		fill("0")
		textSize(24);	
	    text("Press 'ENTER' to play",250,300)
		textSize(22);
		text("Move cursour to fire bullet",240,350)
        if(keyDown('enter')){
		  gameState=1	
		}
	}
	
	if(gameState===1){
		background(spaceImg)	

		warship.y=mouseY
			//generate aliens as many as wave number
 		if(aliengrp.length<wave){
			spawnalien()
      		}
		//generate bullets when space key is pressed
		if(keyDown('space')){
			spawnbullets()
		
		}
		//if an alien is present, and delay is over, generate pellets from the alien.
		if(aliengrp.length>0){
			if (frameCount % 20===0){
				spawnpellets()
				console.log(pelletgrp.length)
			}
			
		}
      //  if(bullet)	    				   
	}
	drawSprites()
}                                                           
function spawnalien(){
	if (frameCount % 60 === 0){
		alien = createSprite(width-20, 200, 20,30)
		alien.y =Math.round(random(20, 580))
		alien.y=alien.y+40
		aliengrp.add(alien)
		alien.addImage(alineImg)  
	}
}
function spawnpellets(){
	
		if(frameCount% 10===0 && pelletgrp.length<count){
		num=aliengrp.length-1
		x=Math.round(random(0, num))
		
		col=Math.round(random(1,3))
		
		pellet=createSprite(width-20, 200, 5,2)
		
		switch (col){
			case 1: pellet.addImage(greenImg)
			break;
			case 2: pellet.addImage(pinkImg)
			break;
			/*case 3: pellet.addImage(blueImg)
			break;*/
			default: break;
		}
		pellet.scale=0.1
		pellet.velocityX=-8
		pellet.y=aliengrp[x].y
		pelletgrp.add(pellet)
		pellet.lifetime=400
		count--
				
		}
		else{
			count=wave*10
			pelletgrp.destroyEach()
		}
		
	
}
function spawnbullets(){
	if(frameCount%20===0){
		bullet=createSprite(0, 200, 10,2)
		bullet.addImage(bulletimg)
		bullet.scale=0.7
		bullet.y= warship.y
		bullet.velocityX=8
		bulletgrp.add(bullet)
		bullet.lifetime=400
	}

}