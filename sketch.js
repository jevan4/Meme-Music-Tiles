let song;
let img;
let img2; 
let img3; 
var scene = 0; 

var whiteTiles = []; 
var pianoTile;

var col1KeyCode=65;
var col2KeyCode=83;
var col3KeyCode=68;
var col4KeyCode=70;

var WIDTH = 65; 
var HEIGHT = 100; 
var score = 0; 
var fRate=60;
//if we want a rectangle to fall with each beat, then we need to know the number of frames per beat
var userKeyPressed=false;

//so fPerBeat frames for the rectangle to get from top to bottom
var canvasHeight = 400;
var yShift = 100;

var debugScore=0;

var songTitle;

function preload(){
  
  let songs=[];

  songs.push(
    new MemeSong("Don't You Forget About Me",
               'assets/dont_you_forget_about_me.mp3',
              112)
    );

  songs.push(
    new MemeSong("I Ran",
               'assets/i_ran.mp3',
              120)
    );
  
   songs.push(
    new MemeSong("Under Pressure",
               'assets/Under Pressure.mp3',
              120)
    );
  
   songs.push(
    new MemeSong("Africa",
               'assets/Africa.mp3',
              100)
    );
  
   songs.push(
    new MemeSong("Megalovania",
         'assets/Undertale - Megalovania (SHORT).mp3',
              120)
    );
  
    songs.push(
    new MemeSong("Super Mario Bros.",
'assets/Super Mario Bros. Music - Main Theme Overworld.mp3',
              80)
    );
  
  
  let memeSong=songs[floor(random(0,songs.length))];
  
  songTitle = memeSong.name;
  
  var bpm = memeSong.bpm;
  //so 2 beats per second
  var bps=bpm/60;
  //if we want a rectangle to fall with each beat, then we     need to know the number of frames per beat
  var fPerBeat = fRate/bps;
  yShift = canvasHeight/fPerBeat;
  
  soundFormats('mp3', 'ogg');
  song = loadSound(memeSong.path);
}

function setup() {
  createCanvas(600, canvasHeight);
  
  whiteTiles.push(0,0,0,0); 
  whiteTiles.push(0,0,0,0); 
  whiteTiles.push(0,0,0,0); 
  whiteTiles.push(0,0,0,0); 
  
  pianoTile = new Tile(WIDTH, HEIGHT, yShift); 
  img = loadImage("assets/mainScene.png");
  img2 = loadImage("assets/screen2.png"); 
  img3 = loadImage("assets/youWin.png"); 
}

function resetRectangle(){
    pianoTile.resetPosition(); 
    userKeyPressed=false;
    //keyPressVal=0;
    pianoTile.colour = color(0,0,0);

}

function getColourForScore(scVal){
  if(scVal===0){
    return color(255, 0, 102);
  }
  else if(0<scVal && scVal<=20){
    return color(255, 153, 102);
  }
  else if(20<scVal && scVal<=25){
    return color(255, 255, 102);
  }
  else if(25<scVal){
    return color(204, 255, 51);
  }

}

function assessScore(colNum,userKeyPressY,keyPressVal){
  if(!userKeyPressed){
    //no key press means no score
    return;
  }
  else {
    
    // use the values of userKeyPressX, userKeyPressY and keyPressVal
    // to increment the score by some value depending on how
    // close they were to the bottom, etc
    
    //what score value if they pressed the right key?
    var scoreValue =0;
    
    var hitCorrectLetter= 
        (colNum===1 && keyPressVal===col1KeyCode) || 
        (colNum===2 && keyPressVal===col2KeyCode) ||
        (colNum===3 && keyPressVal===col3KeyCode) ||
        (colNum===4 && keyPressVal===col4KeyCode);
    
    if(hitCorrectLetter){
      if(userKeyPressY>0 && userKeyPressY<=canvasHeight){
        scoreValue=floor(userKeyPressY/10);
      }
    }
    
    debugScore=scoreValue;
    score = score + scoreValue;
    pianoTile.colour=getColourForScore(scoreValue);
  
  }
}

function drawGame() {
  if(!song.isPlaying()){
    song.play();
  }
  background(220);
  //draw white grid 
   for (var i = 0; i < whiteTiles.length; i++) { 
    
 var whitex = (i % 4) *WIDTH; 
 var whitey = Math.floor(i/4) *HEIGHT;
    
 fill(255,255,255); 
 rect(whitex,whitey,WIDTH,HEIGHT);
}
  //draw the piano tile
  pianoTile.show();
  pianoTile.update();  
  
  if (pianoTile.pos.y>canvasHeight){ 
    //assessScore();
    
    resetRectangle();
  } 
  textSize(35); 
  text("Tile Score: " + debugScore, 300, 90);
  text("Total Score:" + score, 300,130);
  textSize(25); 
  text("Song:" + songTitle,300,50);  
  
  
}

function keyPressed() {
  //check to see if they have already pressed a key this "cycle"
  if(!userKeyPressed){
    //this is the first time this cycle, so set the boolean and capture the state
    userKeyPressed=true;
    var keyPressVal=keyCode;
    //pass where the rectangle is now
    assessScore(pianoTile.colNumber,pianoTile.pos.y,keyPressVal);
  }
 
}

function initialScenedraw() {
  background(img); 
  textSize(20);
  textFont('Georgia');
  text("Click anywhere to start!", 210,250);
  //check what "mode" we should be in and draw accordingly
}
function mousePressed() {
  if(scene<2){
    scene++;  
  }
  
}
    
function draw() {
  //check what "mode" we should be in and draw accordingly
  if(scene===0){
    initialScenedraw();  
  }
  else if(scene===1){
    background(img2);
  }
  else if(scene===2){ 
        //check total score to see if above some threshold
    if (score>=2500) {
    background(img3);
        text("Total points earned:" + score, 100,335);
       text("Click the restart button to play again", 100,360);
      scene++ 
    }
    else {
    drawGame();
    }
  }
}
