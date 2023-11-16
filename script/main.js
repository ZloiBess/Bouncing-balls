// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// create fun-construct

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

// draw ball

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);// 0* - 360*
    ctx.fill();
}

// action ball

Ball.prototype.update = function () {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
}


//collision detection - change color


Ball.prototype.collisionDetect = function () {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color =
                    "rgb(" +
                    random(0, 255) +
                    "," +
                    random(0, 255) +
                    "," +
                    random(0, 255) +
                    ")";
            }
        }
    }
};


// added balls

var balls = [];
var countBall = 25;
var maxSpeed = 7;

function loop() {
    ctx.fillStyle = "rgb(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height); // hide the drawing of the previous frame

    while (balls.length < countBall) {
        var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7, 7),
            random(-7, 7),
            `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
            random(10, 20),
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();
