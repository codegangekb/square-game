import { Vector } from './Vector';
import { Config } from './config';
import { drawCircle } from './utils';
import { Camera } from './Camera';


export class PlayerRenderer {
    private fill = '#3aebca';

    constructor(public data: PlayerData, private config: Config) {
    }

    render(ctx: CanvasRenderingContext2D, xView: number, yView: number): void {
        ctx.translate(-xView + this.data.position.x, -yView + this.data.position.y);
        ctx.rotate(this.data.look);
        ctx.fillStyle = this.fill;
        drawCircle(ctx, 0, 0, this.data.size);
        drawCircle(
            ctx,
            - this.data.size * 0.8,
            - this.data.size * 0.8,
            this.data.size * 0.3
        );
        drawCircle(
            ctx,
            + this.data.size * 0.8,
            - this.data.size * 0.8,
            this.data.size * 0.3
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export class Player extends PlayerRenderer {
    constructor(data: PlayerData, private game: any) {
        super(data, game.config);
    }

    public update(dt: number) {
        this.data.update(dt);
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
            const camera: Camera = this.game.camera;
            const v1 = new Vector(e.pageX + camera.xView, e.pageY + camera.yView);
            this.look = Vector.angle(v1, this.position);
            console.log(`look ${this.look} ${this.position}`);
        })
    }

    move(to: Vector, dt: number = 1) {
        this.position = this.position.add(to.multiple(this.speed).multiple(dt));
    }

    update(dt: number) {
        this.move(this.direction, dt);
    }
}
