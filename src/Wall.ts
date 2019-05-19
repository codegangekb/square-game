import { GameObject } from './entities/GameObject';
import { Drawer } from './entities/Drawer';
import { Transform } from './entities/Transform';
import { WALL_HEIGHT, WALL_WIDTH } from './objects/constants';
import { drawCircle } from './utils';

class WallDrawer extends Drawer {
    collider = null;
    camera = null;

    static MAX_HP = 5;
    hp = WallDrawer.MAX_HP;

    width = WALL_WIDTH;
    height = WALL_HEIGHT;

    map = {
        5: 'wall.svg',
        4: 'wall1.svg',
        3: 'wall2.svg',
        2: 'wall3.svg',
        1: 'wall4.svg',
    };

    render(ctx: CanvasRenderingContext2D) {
        const src = this.map[this.hp] ? this.map[this.hp] : 'wall5.svg';
        ctx.drawImage(this.assets.get(src), -this.width, -this.height / 2, this.width, this.height,);
    }
}

export class Wall extends GameObject {
    hp = 5;

    constructor(public transform: Transform, private game) {
        super(transform, new WallDrawer(transform),
            game.system.createPolygon(transform.position.x, transform.position.y,
                [
                    [0, -WALL_HEIGHT / 2],
                    [-WALL_WIDTH, -WALL_HEIGHT / 2],
                ], transform.angle));

        // @ts-ignore
        this.drawer.collider = this.collider;
        // @ts-ignore
        this.drawer.camera = this.game.camera;
    }

    takeDamage() {
        this.hp--;
        // @ts-ignore
        this.drawer.hp--;
    }
}
