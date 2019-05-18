import './style.css';

const canvas = document.createElement('canvas');
document.body.style.backgroundColor = "#303030";


canvas.width = 1024;
canvas.height = 768;
canvas.classList.add('game-display');


const ctx = canvas.getContext('2d');
if (ctx == null) {
    throw Error("PNH");
}

document.body.appendChild(canvas);

interface Dot {
    x: number;
    y: number;
    radius: number;
}

canvas.onclick = (event: MouseEvent) => {
    const [x, y] = [event.layerX, event.layerY];
    const arc = arcs.find(a => (x >= a.x - a.radius && x <= a.x + a.radius)
        && (y >= a.y - a.radius && y <= a.y + a.radius));
    if (arc) {
        arc.radius = arc.radius * 1.1;
    } else {
        arcs.push({ x, y, radius: 20 });
    }
};

const arcs: Array<Dot> = [];

(function loop() {
    arcs.forEach((arc) => {
        ctx.beginPath();
        ctx.fillStyle = '#3aebca';
        ctx.arc(arc.x, arc.y, arc.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(loop);
})();
