import { Vector } from './entities/Vector';
import { Config } from './config';
import { Game } from './Game';
import { Camera } from './entities/Camera';


export class PlayerRenderer {
    private fill = '#3aebca';

    constructor(public data: PlayerData, private config: Config) {
    }

    render(ctx: CanvasRenderingContext2D, xView: number, yView: number): void {
        ctx.translate(-xView + this.data.position.x, -yView + this.data.position.y);
        ctx.rotate(this.data.look);
        // ctx.fillStyle = this.fill;
        const playerImg = new Image();
        playerImg.src = 'public/player.svg';
        ctx.drawImage(playerImg, -25, -32, 52, 63);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export class _Player extends PlayerRenderer {
    constructor(data: PlayerData, private game: Game) {
        super(data, game.config);
        document.addEventListener('click', e => {
            this.createPizza();
        });
    }

    public update(dt: number) {
        this.data.update(dt);
    }

    createPizza() {
        this.game.createPizzaObject(this.data.position);
    }
}

type Tuple = [number, number];

export class PlayerData {
    size: number = 20; // size of body
    speed: number = 200;

    static directions: Record<string, Tuple> = {
        87: [0, -1],
        65: [-1, 0],
        83: [0, 1],
        68: [1, 0],
    };

    private pressedKeys: Record<string, boolean> = {};

    get direction(): Vector {
        let vector = Vector.zero();

        Object.keys(PlayerData.directions).forEach(key => {
            const isPressed = this.pressedKeys[key] || false;
            if (isPressed) {
                vector = vector.add(new Vector(...PlayerData.directions[key]))
            }
        });

        return vector;
    }

    constructor(public position: Vector = Vector.zero(), public look: number = 0, private game) {
        document.addEventListener('keydown', e => {
            this.pressedKeys[e.keyCode] = true;
        });

        document.addEventListener('keyup', e => {
            this.pressedKeys[e.keyCode] = false;
        });

        const canvas = document.getElementById('display');
        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            this.look = Math.atan2(e.pageX - this.position.x, -(e.pageY - this.position.y));
            const camera: Camera = this.game.camera;
            const v1 = new Vector(e.pageX + camera.xView, e.pageY + camera.yView);
            this.look = Vector.angle(v1, this.position);
        })
    }

    move(to: Vector, dt: number = 1) {
        this.position = this.position.add(to.multiple(this.speed).multiple(dt));
    }

    update(dt: number) {
        this.move(this.direction, dt);
    }
}
