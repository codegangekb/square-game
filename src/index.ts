import './style.css';
import { Game } from './Game';
import { Config } from './config';
import { Assets } from './Assets';

// @ts-ignore
import nipplejs from 'nipplejs';

const canvas = document.createElement('canvas');
canvas.id = 'display';
document.body.style.backgroundColor = "#303030";

const controls = document.createElement('div');
controls.classList.add('controls');
const nipple = nipplejs.create({
    zone: controls,
    color: 'blue',
    multitouch: true
});

const config = new Config();

canvas.width = config.game.width;
canvas.height = config.game.height;

canvas.classList.add('game-display');


const ctx = canvas.getContext('2d');
if (ctx == null) {
    throw Error("PNH");
}

document.body.appendChild(canvas);
document.body.appendChild(controls);

const assets = Assets.getInstance();

const game: Game = new Game(config, nipple);
(async () => {
    await (function init() {
        return assets.load();
    })();

    let time = performance.now();

    (function loop() {
        const { xView, yView, wView, hView } = game.camera;
        ctx.clearRect(xView, yView, wView, hView);
        const now = performance.now();
        const dt = (now - time) / 1000;
        time = now;

        game.update(dt);
        game.render(ctx);

        requestAnimationFrame(loop);
    })();
})();

