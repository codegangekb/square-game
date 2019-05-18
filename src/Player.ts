import { Vector } from './Vector';
import { Config } from './config';
import { drawCircle } from './utils';


export class PlayerRenderer {
    private fill = '#3aebca';

    constructor(public data: PlayerData, private config: Config) {
    }

    render(ctx: CanvasRenderingContext2D, xView: number, yView: number): void {
        const { game } = this.config;
        // ctx.translate(game.width / 2, game.height / 2);
        ctx.rotate(this.data.look);
        ctx.fillStyle = this.fill;
        drawCircle(ctx, this.data.position.x - xView, this.data.position.y - yView, this.data.size);
        drawCircle(ctx, this.data.position.x - this.data.size * 0.8 - xView, this.data.position.y - this.data.size * 0.8 - yView, this.data.size * 0.3);
        drawCircle(ctx, this.data.position.x + this.data.size * 0.8 - xView, this.data.position.y - this.data.size * 0.8 - yView, this.data.size * 0.3);
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
    size: number = 50; // size of body
    speed: number = 200;

    static directions: Record<string, Tuple> = {
        'w': [0, -1],
        'a': [-1, 0],
        's': [0, 1],
        'd': [1, 0],
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

    constructor(public position: Vector = Vector.zero(), public look: number = 0) {
        document.addEventListener('keydown', e => {
            const key = e.key.toLowerCase();
            this.pressedKeys[key] = true;
        });

        document.addEventListener('keyup', e => {
            const key = e.key.toLowerCase();
            this.pressedKeys[key] = false;
        });

        const canvas = document.getElementById('display');
        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const angle = this.position.x;
            console.log(e.layerY);
            console.log(e.layerX);
        })
    }

    rotate(on: number) {
        this.look += on;
    }

    rotateTo(angle: number) {
        this.look = angle;
    }

    move(to: Vector, dt: number = 1) {
        this.position = this.position.add(to.multiple(this.speed).multiple(dt));
    }

    update(dt: number) {
        this.move(this.direction, dt);
    }
}
