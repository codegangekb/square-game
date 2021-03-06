import uuid from 'uuid';
import { GameObject } from './entities/GameObject';
import { Transform } from './entities/Transform';
import { Drawer } from './entities/Drawer';

export class PizzaDrawer extends Drawer {
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.assets.get('pizza.svg'), -15, -15, 30, 30);
    }
}

export class Pizza extends GameObject {
    id = uuid();
    isWaitingToEating = false;

    constructor(transform: Transform) {
        super(transform, new PizzaDrawer(transform));
    }
}
