const resolutionCercle = 400; 

class Goutte {
  
  constructor(x, y, r) {
    this.center = createVector(x,y);
    this.x = x;
    this.y = y;
    this.r = r;
    var couleurs = [color(165, 254, 240), color(62, 138, 143), color(106, 196, 179), color(68, 158, 196), color(106, 153, 196), color(54, 109, 170), color(0, 89, 123), color(154, 198, 236), color(203, 230, 254), color(75, 97, 202), color(80, 226, 244)];
    this.couleur = random(couleurs);
    
  
//     Créer une forme définie par des sommets (périmètre)
    this.sommets = [];
    for(let i = 0; i < resolutionCercle; i++){
      let angle = map(i, 0, resolutionCercle, 0, TWO_PI);
      let s = createVector(cos(angle), sin(angle));
      s.mult(this.r);
      s.add(this.x, this.y);
      this.sommets[i] = s;
    }
  }
  
  
  ligne(v, x, y, z, c) {
    let u = 1 /pow(2, 1/c);
    let b = createVector(x, y);
    for (let s of this.sommets){
      let pb = p5.Vector.sub(s, b);
      let n = v.copy().rotate(HALF_PI);
      let d = abs(pb.dot(n));
      let mag = z * pow(u, d);
      s.add(v.copy().mult(mag));
    }
  }
  
  marble(other) {
    
    for (let s of this.sommets){
      let c = other.center;
      let r = other.r;
      let p = s.copy();
      p.sub(c);
      let mSq = p.magSq();
      let root = sqrt(1 + (r * r) / mSq);
      p.mult(root);
      p.add(c);
      s.set(p);
    }
  }
  
  show(){
    fill(this.couleur);
    noStroke();
    beginShape(); 
    for(let s of this.sommets) {
    vertex(s.x, s.y);  
    }
    endShape(CLOSE);
  }
}  