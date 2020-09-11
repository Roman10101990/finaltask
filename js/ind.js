let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "../img/img/bg.png";
const aster = new Image();
aster.src = "../img/img/aster.png";
const ship = new Image();
ship.src = "../img/img/ship.png";
let fireImg = new Image();
fireImg.src = "../img/img/fire.png";

let timer = 0;
let asteroid = new Array();
let spship = { x: 300, y: 530 };
let fire = [];

document.addEventListener("keydown", move);
function move(e) {
    switch (e.keyCode) {
        case 37:
            spship.x -= 28;
            break;
        case 39:
            spship.x += 28;
            break;
    };
}

bg.onload = function () {
    game();
}

function game() {
    update();
    render();
    requestAnimationFrame(game);
}


function update() {
    timer++;
    if (timer % 15 == 0) {
        asteroid.push({
            x: Math.random()*590,
            y: -50,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 0.5,
            del: 0 
        });

    }
    if (timer % 15 == 0) {
        fire.push({
            x: spship.x + 10,
            y: spship.y,
            dx: 0,
            dy: -5
        });
    }
    for (let i in fire) {
            fire[i].x = fire[i].x + fire[i].dx;
            fire[i].y = fire[i].y + fire[i].dy;

            if (fire[i].y <= 10) { fire.splice(i, 1); }
    }
    for (let i in asteroid) {
        asteroid[i].x += asteroid[i].dx;
        asteroid[i].y += asteroid[i].dy;
        if (asteroid[i].x >= 540 || asteroid[i].x < 0) asteroid[i].dx = -asteroid[i].dx;
        if (asteroid[i].y >= 590) asteroid.splice(i, 1);
        for (j in fire) {
            if (Math.abs(asteroid[i].x + 25 - fire[j].x - 15) < 50
                && Math.abs(asteroid[i].y - fire[j].y) < 25) {
                asteroid[i].del = 1;
                fire.splice(j, 1); break;
            }
        }
        if (asteroid[i].del == 1) asteroid.splice(i, 1);
    }

}

function render() {
    ctx.drawImage(bg, 0, 0, 590, 590);
    ctx.drawImage(ship, spship.x, spship.y, 50, 50);
    for (let i in fire) ctx.drawImage(fireImg, fire[i].x, fire[i].y, 30, 30);
    for (let i in asteroid) ctx.drawImage(aster, asteroid[i].x, asteroid[i].y, 50, 50);
}