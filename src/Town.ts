import { GameObject } from './entities/GameObject';
import { Drawer } from './entities/Drawer';
import { Transform } from './entities/Transform';
import { TOWN_HEIGHT } from './objects/constants';

class TownDrawer extends Drawer {
    width = TOWN_HEIGHT;
    height = TOWN_HEIGHT;
    render(ctx: CanvasRenderingContext2D) {
        const townImage = new Image();
        townImage.src = 'public/town.svg';
        ctx.drawImage(townImage, -this.width / 2, -this.height / 2, this.width, this.height);
    }
}

export class Town extends GameObject {
    constructor(public transform: Transform) {
        super(transform, new TownDrawer(transform));
    }
}
