let fft

global=0 // set design to my theming

let Particle = function (position) {
  this.position = position
  this.speed = createVector(0, random(0,100)/10)
  if(global ==1){
    this.color = [0,0,random(100,255)]
  } else {
    this.color = [random(197, 218),random(175, 195), random(135,155)]
  }

  this.draw = function () {
    circle(this.position.x, this.position.y, this.diameter)
    fill(this.color)
  }
  this.update = function (energy) {
    this.position.y += (this.speed.y+0.0001) * (energy+0.01) * 10
    if (this.position.y > height) {
      this.position.y = 0
    }
    this.diameter = (this.position.y * (random(5, 7) + energy*200))/1000 + 2

    if(global ==1){
      this.color = [this.color[1]+100,this.color[1],this.color[2]]
    }

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()

  let mic = new p5.AudioIn()
  mic.start()

  fft = new p5.FFT()
  fft.setInput(mic)

  positionParticles()
}

function draw() {
  background(0, 0, 0)
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}
