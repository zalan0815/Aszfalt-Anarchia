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

    if (kocsik.length > 0) {
        kocsik.forEach(kocsi => {
            ctx.drawImage(kocsi.auto, kocsi.x, kocsi.y);
            kocsi.y += speed / 3;
        });
    }
    
    if (count >= 60) {
        count = 0;
        points += 1;
        score.innerHTML = points;

        kocsik.push(new Kocsik(auto1, c[Math.floor(Math.random() * 4)], -1000))
    }
    else {
        count += 1;
    }


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

    speed += 0.02;

    requestAnimationFrame(animate);
}
animate();

// if (points > maxPoints) {
//     maxPoints = points;
//     max.innerHTML = points;
// }