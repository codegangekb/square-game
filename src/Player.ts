import { GameObject } from './entities/GameObject';
import { Transform } from './entities/Transform';
import { Drawer } from './entities/Drawer';
import { Tuple } from './utils';
import { Camera } from './entities/Camera';
import { Vector } from './entities/Vector';
import { Game } from './Game';


class PlayerDrawer extends Drawer {
    render(ctx: CanvasRenderingContext2D) {
        const playerImg = new Image();
        playerImg.src = 'public/player.svg';
        ctx.drawImage(playerImg, -18, -48, 52, 63);
    }
}

export class Player extends GameObject {
    speed: number = 200;

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
        });

        document.addEventListener('click', (e: MouseEvent) => {
           this.game.createPizzaObject(this.transform.position);
        });
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

