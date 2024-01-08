const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasw = canvas.width = 900;
const canvash = canvas.height = 900;

let speed = 10;
let points = 0;
let maxPoints = 0;
const score = document.getElementById('score');
score.innerHTML = points;
const max = document.getElementById('max');
max.innerHTML = points;

const ut = new Image();
ut.src = 'img/2000sablon.png';

const auto1 = new Image();
auto1.src = 'img/Névtelen2.png';
// const car = {
//     src: 'img/player.png',
//     x: 375,
//     y: 600,
//     width: 140,
//     height: 250,
//     velocityX: 0,
// };


class Kocsik {
    constructor(auto, x, y) {
        this.auto = auto;
        this.x = x;
        this.y = y;
    }
}

const kocsik = [];

const c = [90, 270, 470, 660];

let x1 = 0;
let x2 = -2000;
let count = 0;

function animate() {
    ctx.clearRect(0, 0, canvasw, canvash);
    ctx.drawImage(ut, 0, x1);
    ctx.drawImage(ut, 0, x2);

    moveBackground()
    drawEnemies();
    moveEnemies();
    // drawCar();
    // moveCar();
    //checkCollisions();

    if (speed < 15) speed += 0.01;
    count += 1;

    if (count % 60 == 0) {
        points += 1;
        score.innerHTML = points;
    }

    requestAnimationFrame(animate);
}

animate();

// window.addEventListener('keydown', (e) => {
//     if (e.key === 'ArrowLeft') {
//         car.velocityX = -speed;
//     } else if (e.key === 'ArrowRight') {
//         car.velocityX = speed;
//     }
// });

// window.addEventListener('keyup', (e) => {
//     if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
//         car.velocityX = 0;
//     }
// });


function moveEnemies() {
    if (kocsik.length > 0) {
        kocsik.forEach(kocsi => {
            ctx.drawImage(kocsi.auto, kocsi.x, kocsi.y);
            kocsi.y += speed / 3;
        });
    }
//     for (let i = 0; i < kocsik.length; i++) {
//         kocsik[i].y += 5;

//         if (kocsik[i].y > canvas.height) {
//             kocsik.splice(i, 1);
//             i--;
//         }
}

//     if (Math.random() < 0.005) {
//         const enemy = {
//             x: Math.random() * (canvas.width - 50),
//             y: -50,
//             width: 140,
//             height: 250,
//             color: 'blue'
//         };
//         kocsik.push(enemy);
//     }
// }

function drawEnemies() {
    if (count % 60 * speed == 0) {
        kocsik.push(new Kocsik(auto1, c[Math.floor(Math.random() * 4)], -1000));
    }
//     for (const enemy of kocsik) {
//         ctx.fillStyle = enemy.color;
//         ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
//     }
}

function moveBackground() {
    ctx.drawImage(ut, 0, x1);
    ctx.drawImage(ut, 0, x2);
    
    x1 += speed;
    x2 += speed;

    if ( x1 > 1500 ) {
        x1 = x2 - 2000 + speed;
    }
    else {
        x1 += speed;
    }
    if ( x2 > 1500 ) {
        x2 = x1 - 2000 + speed;
    }
    else {
        x2 += speed;
    }
}
//     if ( x1 > 1500 ) {
//         x1 = x2 - 2000 + speed;
//     }
//     else {
//         x1 += speed;
//     }
//     if ( x2 > 1500 ) {
//         x2 = x1 - 2000 + speed;
//     }
//     else {
//         x2 += speed;
//     }

//     speed += 0.02;

//     requestAnimationFrame(animate);
    
//     speed += 0.0002;
    
//     if (count >= 60) {
//         count = 0;
//         points += 1;
//         score.innerHTML = points;
//     }
//     else {
//         count += 1;
//     }
// }

// function drawCar() {
//     ctx.fillStyle = car;
//     ctx.fillRect(375, 600, 140, 250);
// }

// function moveCar() {
//     car.x += car.velocityX;

//     if (car.x < 80) {
//         car.x = 80;
//     } else if (car.x > (canvas.width - 80) - car.width) {
//         car.x = (canvas.width - 80) - car.width;
//     }
// }

// function checkCollisions() {
//     for (const enemy of enemies) {
//         if (
//             car.x < enemy.x + enemy.width &&
//             car.x + car.width > enemy.x &&
//             car.y < enemy.y + enemy.height &&
//             car.y + car.height > enemy.y
//         ) {
//             alert('Vesztettél te szar');
//             resetGame();
//         }
//     }
// }

// if (points > maxPoints) {
//     maxPoints = points;
//     max.innerHTML = points;
//}