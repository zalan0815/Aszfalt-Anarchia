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
ut.src = 'kepek/Névtelen.png';

class Kocsik {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const kocsik = [];

let x = 0;
let x2 = -900;
let count = 0;

function animate() {
    ctx.clearRect(0, 0, canvasw, canvash);
    ctx.drawImage(ut, 0, x);
    ctx.drawImage(ut, 0, x2);
    if ( x > 900 ) {
        x = x2 - 900 + speed;
    }
    else {
        x += speed;
    }
    if ( x2 > 900 ) {
        x2 = x - 900 + speed;
    }
    else {
        x2 += speed;
    }

    speed += 0.02;

    if (count >= 60) {
        count = 0;
        points += 1;
        score.innerHTML = points;
    }
    else {
        count += 1;
    }
    requestAnimationFrame(animate);
}
animate();

// if (points > maxPoints) {
//     maxPoints = points;
//     max.innerHTML = points;
// }