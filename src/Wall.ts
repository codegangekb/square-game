import { GameObject } from './entities/GameObject';
import { Drawer } from './entities/Drawer';
import { Transform } from './entities/Transform';
import { WALL_HEIGHT, WALL_WIDTH } from './objects/constants';
import { drawCircle } from './utils';

class WallDrawer extends Drawer {
    collider = null;
    camera = null;

    width = WALL_WIDTH;
    height = WALL_HEIGHT;
    render(ctx: CanvasRenderingContext2D) {
        const wallImage = new Image();
        wallImage.src = 'public/wall.svg';
        // ctx.drawImage(wallImage, -this.width, -this.height / 2, this.width, this.height,);

        if (this.collider && this.camera) {

            ctx.strokeStyle = 'red';
            ctx.beginPath();

            this.collider.draw(ctx);

            ctx.stroke();
        }
    }
}

export class Wall extends GameObject {
    constructor(public transform: Transform, private game) {
        super(transform, new WallDrawer(transform),
            game.system.createPolygon(transform.position.x - WALL_WIDTH / 2, transform.position.y,
                [[-WALL_HEIGHT /2,-WALL_WIDTH / 2], [-WALL_HEIGHT /2, WALL_WIDTH /2], [WALL_HEIGHT /2 , WALL_WIDTH /2], [WALL_HEIGHT /2 , -WALL_WIDTH /2]],transform.angle));

        // @ts-ignore
        this.drawer.collider = this.collider;
        // @ts-ignore
        this.drawer.camera = this.game.camera;
    }
}
