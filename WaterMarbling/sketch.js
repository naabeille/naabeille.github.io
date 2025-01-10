//Projet basé sur "Mathematical Marbling" par codingtrain 
// et sa vidéo https://www.youtube.com/watch?v=p7IGZTjC008&t=776s

let gouttes = []; 
let debut;

function setup() {
  createCanvas(600, 300);
  for (let i = 0; i < 15; i++){
      ajoutEncre(width/2, height/2, width/4 - random(10)*i);
  }
  
  for (let i = 0; i < 30; i++) {
      ajoutEncre(random(10, width-10), random(10, height-10), random(20, 50));
  }
  
  debut = createVector(mouseX, mouseY);
}

  function ligneDrag(v, x, y, z, c){
    for(let goutte of gouttes) {
      goutte.ligne(v, x, y, z, c);
    } 
  }

function mousePressed() {
  ajoutEncre(mouseX, mouseY, 50)
}

function ajoutEncre(x, y, r){
  let goutte = new Goutte(x, y, r);
  for (let autre of gouttes){
      autre.marble(goutte);
  }
  gouttes.push(goutte);
}

function draw() {
  let fin = createVector(mouseX, mouseY);
  fin.sub(debut);
  fin.normalize();
  ligneDrag(fin, mouseX, mouseY, 5, 10);
  
  background(240, 200, 200);

  for (let goutte of gouttes) {
    goutte.show();
  }
  debut = createVector(mouseX, mouseY);
}