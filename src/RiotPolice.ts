import { Vector } from './Vector';
import { Config } from './config';
import { drawCircle } from './utils';


export class RiotPoliceRenderer {
    private fill = 'brown';

    constructor(public data: RiotPoliceData, private config: Config) {
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

export class RiotPolice extends RiotPoliceRenderer {
    constructor(data: RiotPoliceData, private game: any) {
        super(data, game.config);
    }

    public update(dt: number) {
        this.data.update(dt);
    }
}

type Tuple = [number, number];

export class RiotPoliceData {
    size: number = 25; // size of body
    speed: number = 3;
    target: Vector = null;

    static directions: Record<string, Tuple> = {
        87: [0, -1],
        65: [-1, 0],
        83: [0, 1],
        68: [1, 0],
    };

    private pressedKeys: Record<string, boolean> = {};

    get direction(): Vector {
        let vector = Vector.zero();

       if (this.target) {
           if ( Math.abs(this.target.x - this.position.x) <= 5 || Math.abs(this.target.y - this.position.y) <= 5) {
           } else { vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y) }
       }
        return vector;
    }

    constructor(public position: Vector = Vector.zero(), public look: number = 0) {

    }

    move(to: Vector, dt: number = 1) {
        this.position = this.position.add(to.multiple(this.speed).multiple(dt));
    }

    update(dt: number) {
        this.move(this.direction, dt);
    }
}
