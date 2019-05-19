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
        ctx.drawImage(wallImage, -this.width, -this.height / 2, this.width, this.height,);

        if (this.collider) {
            ctx.rotate(-this.transform.angle);
            ctx.translate(
                -this.transform.position.x,
                -this.transform.position.y
            );


            drawCircle(ctx, this.collider._x, this.collider._y, 5);

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
}
