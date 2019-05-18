import { Vector } from './Vector';
import { Config } from './config';
import { drawCircle, drawTriangle } from './utils';
import uuid from 'uuid';

export class PizzaRenderer {
    private fill = 'brown';

    constructor(public data: PizzaData, private config: Config) {
    }

    render(ctx: CanvasRenderingContext2D, xView: number, yView: number): void {
        ctx.translate(-xView + this.data.position.x, -yView + this.data.position.y);

        ctx.rotate(this.data.look);
        const pizzaImg = new Image();
        pizzaImg.src = 'public/pizza.svg';
        ctx.drawImage(pizzaImg, -15, -15, 30, 30);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export class Pizza extends PizzaRenderer {
    id = uuid();
    isWaitingToEating = false;
    constructor(data: PizzaData, private game: any) {
        super(data, game.config);
    }

    public update(dt: number) {
        this.data.update(dt);
    }
}

type Tuple = [number, number];

export class PizzaData {
    size: number = 25; // size of body
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

        Object.keys(PizzaData.directions).forEach(key => {
            const isPressed = this.pressedKeys[key] || false;
            if (isPressed) {
                vector = vector.add(new Vector(...PizzaData.directions[key]))
            }
        });

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
