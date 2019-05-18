import { GameObject } from './entities/GameObject';
import { Transform } from './entities/Transform';
import { Drawer } from './entities/Drawer';
import { drawCircle, Tuple } from './utils';
import { Camera } from './entities/Camera';
import { Vector } from './Vector';
import { Game } from './Game';


class PlayerDrawer extends Drawer {
    fill = '#3aebca';

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fill;
        drawCircle(ctx, 0, 0, this.transform.size);
        drawCircle(
            ctx,
            - this.transform.size * 0.8,
            - this.transform.size * 0.8,
            this.transform.size * 0.3
        );
        drawCircle(
            ctx,
            + this.transform.size * 0.8,
            - this.transform.size * 0.8,
            this.transform.size * 0.3
        );
    }
}

export class Player extends GameObject {
    speed: number = 50;

    constructor(transform: Transform, private game: Game) {
        super(transform, new PlayerDrawer(transform));

        this.listen();
    }

    static directions: Record<string, Tuple> = {
        87: [0, -1],
        65: [-1, 0],
        83: [0, 1],
        68: [1, 0],
    };

    private pressedKeys: Record<string, boolean> = {};


    listen() {
        document.addEventListener('keydown', e => {
            this.pressedKeys[e.keyCode] = true;
        });

        document.addEventListener('keyup', e => {
            this.pressedKeys[e.keyCode] = false;
        });

        document.addEventListener('mousemove', (e: MouseEvent) => {
            const camera: Camera = this.game.camera;
            const v1 = new Vector(e.pageX + camera.xView, e.pageY + camera.yView);
            this.transform.lookAt(v1);
        })
    }

    get direction(): Vector {
        let vector = Vector.zero();

        Object.keys(Player.directions).forEach(key => {
            const isPressed = this.pressedKeys[key] || false;
            if (isPressed) {
                vector = vector.add(new Vector(...Player.directions[key]))
            }
        });

        return vector;
    }

    update(dt: number) {
        super.update(dt);

        const path = this.direction.multiple(this.speed).multiple(dt);

        this.transform.setPosition(this.transform.position.add(path));

    }
}

