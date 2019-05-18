import { Camera } from './Camera';
import { GameObject } from './GameObject';
import { Transform } from './Transform';

export abstract class Drawer {
    constructor(protected transform: Transform) {

    }

    protected abstract render(ctx: CanvasRenderingContext2D);

    public draw(ctx: CanvasRenderingContext2D, camera: Camera) {
        ctx.translate(
            -camera.xView + this.transform.position.x,
            -camera.yView + this.transform.position.y
        );
        ctx.rotate(this.transform.angle);

        this.render(ctx);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
