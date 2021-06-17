class Tile {
  constructor(w,h,velocity) {
    this.vel=velocity;
    this.colNumber = floor(random(1,5));
    this.pos = createVector(65*(this.colNumber-1),0); 
    this.colour = color(0,0,0);
    this.width = w; 
    this.height = h; 
  }

  resetPosition(){
     this.colNumber = floor(random(1,5));
     this.pos.y=0;
     this.pos.x = 65*(this.colNumber-1);    
  }
  update() {
    this.pos.add(0,this.vel);
  }

  show() {
    fill(this.colour);
    rect(this.pos.x,this.pos.y,this.width,this.height); 
  }
}


