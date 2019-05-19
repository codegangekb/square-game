import { GameObject } from './entities/GameObject';
import { Drawer } from './entities/Drawer';
import { Transform } from './entities/Transform';
import { Vector } from './entities/Vector';
import { Cosmonaut } from './Cosmonaut';
import { Camera } from './entities/Camera';

class StaticDrawer extends Drawer {

    constructor(transform: Transform, private imgPath: string, private w: number, private h: number) {
        super(transform);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.assets.get(this.imgPath), -this.w / 2, -this.h / 2, this.w, this.h);
    }
}

export class Static extends GameObject {
    constructor(public transform: Transform, imgPath: string, w: number, h: number, game) {
        super(transform, new StaticDrawer(transform, imgPath, w, h), game.system.createCircle(transform.position.x, transform.position.y, (w > h ? w : h)/2));
        this.collider.x = this.transform.position.x;
        this.collider.y = this.transform.position.y;
    }
}

export class StaticObject {
    static: Static;
    constructor(imgPath: string, w: number, h: number, rotate: number, vector: Vector, game, public offColider = false) {
        const transform = new Transform(vector, rotate);
        this.static = new Static(transform, imgPath, w, h, game);
        // const cosmonaut = new Cosmonaut(transform, this);
        // this.riotPolice.push(cosmonaut);
    }

    render(ctx: CanvasRenderingContext2D, camera: Camera) {
        this.static.render(ctx, camera);
    }

}
