import { Camera } from './Camera';
import { GameObject } from './GameObject';
import { Transform } from './Transform';
import { Assets } from '../Assets';

export abstract class Drawer {
    protected assets: Assets;
    constructor(protected transform: Transform) {
        this.assets = Assets.getInstance();
    }

    protected abstract render(ctx: CanvasRenderingContext2D);

    public draw(ctx: CanvasRenderingContext2D, camera: Camera) {
        if (camera.xView - this.transform.position.x > 100 &&
            camera.yView - this.transform.position.y > 100) {
            return;
        }
        ctx.translate(
            -camera.xView + this.transform.position.x,
            -camera.yView + this.transform.position.y
        );
        ctx.rotate(this.transform.angle);
        this.render(ctx);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
