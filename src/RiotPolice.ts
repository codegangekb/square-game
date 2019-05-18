import { Vector } from './Vector';
import { Config } from './config';
import { drawCircle, getRandomBeetwen } from './utils';
import { Game } from './Game';
import { Pizza } from './Pizza';


export class RiotPoliceRenderer {
    private fill = 'brown';

    constructor(public data: RiotPoliceData, private config: Config) {
    }

    render(ctx: CanvasRenderingContext2D, xView: number, yView: number): void {
        ctx.translate(-xView + this.data.position.x, -yView + this.data.position.y);
        ctx.rotate(this.data.look);
        const kosmonavtImg = new Image();
        kosmonavtImg.src = 'public/kosmonavt.svg';
        ctx.drawImage(kosmonavtImg, -41, -52, 62, 85);
        // ctx.fillStyle = this.fill;
        // drawCircle(ctx, 0, 0, this.data.size);
        // drawCircle(
        //     ctx,
        //     - this.data.size * 0.8,
        //     - this.data.size * 0.8,
        //     this.data.size * 0.3
        // );
        // drawCircle(
        //     ctx,
        //     + this.data.size * 0.8,
        //     - this.data.size * 0.8,
        //     this.data.size * 0.3
        // );
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
    speed: number = getRandomBeetwen(0.7, 1);
    target: Pizza = null;
    initialPosition: Vector = null;
    initialLook: number = null;
    static directions: Record<string, Tuple> = {
        87: [0, -1],
        65: [-1, 0],
        83: [0, 1],
        68: [1, 0],
    };

    private pressedKeys: Record<string, boolean> = {};

    get direction(): Vector {
        let vector = Vector.zero();
        const position = this.target && this.target.data.position || this.initialPosition;
       // if ( !( Math.abs(position.x - this.position.x) <= 10 || Math.abs(position.y - this.position.y) <= 10)) {
       if ( !( Math.abs(position.x - this.position.x) <= 10 || Math.abs(position.y - this.position.y) <= 10)) {
           vector = new Vector(position.x - this.position.x, position.y - this.position.y);
           this.look = Vector.angle(position, this.position);
       } else {
           this.target && this.game.eatPizza(this.target);
           this.target = null;
           this.look = this.initialLook;
       }

        return vector;
    }

    constructor(public position: Vector = Vector.zero(), public look: number = 0, private game: Game) {
        this.initialPosition = Vector.clone(this.position);
        this.initialLook = look;
    }

    move(to: Vector, dt: number = 1) {
        this.position = this.position.add(to.multiple(this.speed).multiple(dt));
    }

    update(dt: number) {
        this.move(this.direction, dt);
    }
}
