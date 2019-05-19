import './style.css';
import { Game } from './Game';
import { Config } from './config';
import { Assets } from './Assets';

const canvas = document.createElement('canvas');
canvas.id = 'display';
document.body.style.backgroundColor = "#303030";

const config = new Config();

canvas.width = config.game.width;
canvas.height = config.game.height;

canvas.classList.add('game-display');


const ctx = canvas.getContext('2d');
if (ctx == null) {
    throw Error("PNH");
}

document.body.appendChild(canvas);

const assets = Assets.getInstance();

const game: Game = new Game(config);
(async () => {
    await (function init() {
        return assets.load();
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
})();

