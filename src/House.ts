import { GameObject } from './entities/GameObject';
import { Transform } from './entities/Transform';
import { Drawer } from './entities/Drawer';
// @ts-ignore
import { Result } from 'collisions';

export class HouseDrawer extends Drawer {
    hide: boolean = false

    render(ctx: CanvasRenderingContext2D) {
        if (this.hide) {
            ctx.globalAlpha = 0.3;
        }
        const img = this.assets.get('house.svg');
        ctx.drawImage(img, -img.width / 2,  -img.height / 2, img.width, img.height);
        ctx.globalAlpha = 1;
    }
}

export class House extends GameObject {
    constructor(transform: Transform, private game) {
        super(transform, new HouseDrawer(transform),
            game.system.createCircle(transform.position.x, transform.position.y, 200))
    }

    update(dt) {
        super.update(dt);

        const result = new Result();
        // @ts-ignore
        this.drawer.hide = !!this.collider.collides(this.game.player.collider, result);
    }
}
