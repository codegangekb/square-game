import './style.css';
import { Game } from './Game';
import { Camera } from './Camera';

const canvas = document.createElement('canvas');
canvas.id = 'display';
document.body.style.backgroundColor = "#303030";


canvas.width = 1024;
canvas.height = 768;
canvas.classList.add('game-display');


const ctx = canvas.getContext('2d');
if (ctx == null) {
    throw Error("PNH");
}

document.body.appendChild(canvas);

const game: Game = new Game();

(function init() {

})();

let time = performance.now();

(function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now();
    const dt = (now - time) / 1000;
    time = now;

    game.update(dt);
    game.render(ctx);

    requestAnimationFrame(loop);
})();
