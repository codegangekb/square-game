import { GameObject } from './entities/GameObject';
import { Drawer } from './entities/Drawer';
import { Transform } from './entities/Transform';
import { WALL_HEIGHT, WALL_WIDTH } from './objects/constants';

class WallDrawer extends Drawer {
    width = WALL_WIDTH;
    height = WALL_HEIGHT;
    render(ctx: CanvasRenderingContext2D) {
        const wallImage = new Image();
        wallImage.src = 'public/wall.svg';
        ctx.drawImage(wallImage, -this.width, -this.height / 2, this.width, this.height);
    }
}

export class Wall extends GameObject {
    constructor(public transform: Transform) {
        super(transform, new WallDrawer(transform));
    }
}
