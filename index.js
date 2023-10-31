const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino_img = new Image();
dino_img.src = 'dino.png';
var cactus_img = new Image();
cactus_img.src = 'cactus.png';
var score = 0

var dino = {
    x: 100,
    y: 200,
    width: 50,
    height: 50,
    draw() {

        ctx.drawImage(dino_img, this.x, this.y, this.width, this.height);

    }
}
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;

    }
    draw() {

        ctx.drawImage(cactus_img, this.x, this.y, this.width, this.height);

    }

}
// var cactus = {
//     x: 500,
//     y: 200,
//     width: 50,
//     height: 50,
//     draw() {

//         ctx.drawImage(cactus_img, this.x, this.y, this.width, this.height);

//     }

// }
var animation;
var timer = 0;
var ttimer = 0
var jump_timer = 0;
var cactus_list = [];
var speed = 3;
var level = 0

function drawScore() {


    ctx.font = '20px Arial';
    ctx.fillText(`점수: ${score}`, canvas.width - 100, 30)
}

function play() {

    animation = requestAnimationFrame(play);
    timer++;
    ttimer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    if (speed > 3.5 + level * 0.1) {

        level = 1 + Math.round(speed)
        console.log(level)
    }

    if (timer % Math.max(240 - level * 10, 120) == 1) {
        let cactus = new Cactus();
        if (Math.random() > 0.5) {
            cactus.height = 75;
            cactus.y -= 25;
            cactus_list.push(cactus);

        } else {
            cactus_list.push(cactus);
        }
        speed += speed * 0.1;

    }

    cactus_list.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1)
            score += 1

        }
        a.x -= speed;
        a.draw();

        collision(dino, a)






    })
    if (dino.y < 200) {
        dino.y += 3;
    }
    if (jump) {
        jump_timer++;
        dino.y -= 6;
        if (jump_timer > 50) {
            jump = false
            jump_timer = 0
        }

    }
    dino.draw();
    drawScore();



}
var jump = false;
document.addEventListener('keydown', function(e) {


    if (e.code === 'Space' && dino.y == 200) {
        jump = true;
    }
});

function collision(dino, cactus) {
    var x_len = cactus.x - (dino.x + dino.width);
    var y_len = cactus.y - (dino.y + dino.height);
    // console.log(x_len, y_len);
    if (x_len < 0 && y_len < 0 && x_len > -dino.width) {
        cancelAnimationFrame(animation)
        console.log('점수', score)
    }
}
play()

// for (i = 0; i < 300; i++) {
//     dino.x = dino.x + 1;
//     dino.draw();



// }

// ctx.fillStyle = 'red';
// ctx.fillRect(50, 200, 50, 50);


// ctx.fillStyle = 'blue';
// ctx.fillRect(500, 200, 50, 50);