const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasw = canvas.width = 900;
const canvash = canvas.height = 900;

let requestId;
let game;

let speed = 10;
let egerut = 1;
let points = 0;
let maxPoints = 0;
let deathList = [];

const startButton = document.getElementById("start");

const ut = new Image();
ut.src = 'img/2000sablon.png';

const player = new Image();
player.src = 'img/player.png';
let playerPos = 450;
let playerMoving = 0;
let playerSpeed = 1;

const autok = ['kek', 'lila', 'narancs', 'piros', 'sarga', 'zold']
// const car = {
//     src: 'img/player.png',
//     x: 375,
//     y: 600,
//     width: 140,
//     height: 250,
//     velocityX: 0,
// };


class Kocsik {
    constructor(img, x, y) {
        this.szin = new Image();
        this.szin.src = img;
        this.x = x;
        this.y = y;
    }
}

let kocsik = [];

const savok = [90, 270, 470, 660];

let x1 = 0;
let x2 = -2000;
let count = 0;

function start() {
    game = true;
    playerPos = 450;
    playerMoving = 0;
    speed = 10;
    egerut = 1;
    points = 0;
    deathList = [];
    kocsik = [];
    x1 = 0;
    x2 = -2000;
    count = 0;
    requestId = requestAnimationFrame(animate);
    startButton.style.display = 'none';
}

function lose() {
    game = false;
    if (points > maxPoints) maxPoints = points;
    cancelAnimationFrame(requestId);
    ctx.clearRect(0, 0, canvasw, canvash);
    startButton.style.display = 'block';
}

function animate() {
    if (game)
    {
        ctx.clearRect(0, 0, canvasw, canvash);

        moveBackground();
        drawEnemies();
        moveEnemies();
        playerMovement();
        // drawCar();
        checkCollisions();
        pointPrint();
    
        if (speed < 50) speed += 0.05;
        count += 1;
    
        if (count % 60 == 0) {
            points += 1;
        }
        
        requestId = requestAnimationFrame(animate);
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerMoving = -1;
    } else if (e.key === 'ArrowRight') {
        playerMoving = 1;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        playerMoving = 0;
    }
});

function drawEnemies() {
    if (count % 180 * speed == 0) {

        egerut += Math.floor(Math.random() * 3) - 1;
        if (egerut < 0) egerut = 0;
        if (egerut > 3) egerut = 3;

        for (let sav = 0; sav < savok.length; sav++) {
            if (sav != egerut){
                if (Math.floor(Math.random() * 2) == 1) kocsik.push(new Kocsik('img/' + autok[Math.floor(Math.random() * autok.length)] + '.png', savok[sav], -1000));
            }
        }
    }
//     for (const enemy of kocsik) {
//         ctx.fillStyle = enemy.color;
//         ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
//     }
}

function moveEnemies() {
    if (kocsik.length > 0) {
        kocsik.forEach((kocsi, index) => {
            ctx.drawImage(kocsi.szin, kocsi.x, kocsi.y);
            kocsi.y += speed / 3;

            if (kocsi.y > 900) {
                deathList.push(index);  
            }
        });
        
        for (let i = deathList.length - 1; i >= 0; i--) {
            kocsik.splice(deathList[i], 1);
        }

        deathList = [];
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
//      ctx.fillStyle = car;
//      ctx.fillRect(375, 600, 140, 250);
// }

function playerMovement() {
    ctx.drawImage(player, playerPos, 600)

    playerPos += (playerSpeed + speed / 5) * playerMoving;
    if (playerPos < 80) playerPos = 80;
    if (playerPos > 680) playerPos = 680; 
//     car.x += car.velocityX;

//     if (car.x < 80) {
//         car.x = 80;
//     } else if (car.x > (canvas.width - 80) - car.width) {
//         car.x = (canvas.width - 80) - car.width;
//     }
}

function checkCollisions() {
    kocsik.forEach(kocsi => {
        if ((kocsi.y + 250) >= 600 && kocsi.y < 800)
        {
            if (playerPos + 140 > kocsi.x && playerPos < kocsi.x + 140) lose();
        }
    });
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
}

function pointPrint() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(points, 10, 50);
    ctx.fillText(maxPoints, 10, 100)
}
// if (points > maxPoints) {
//     maxPoints = points;
//     max.innerHTML = points;
//}