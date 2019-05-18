import { Transform } from './Transform';
import { Drawer } from './Drawer';
import { Camera } from './Camera';
import { Animation } from './Animation';

export abstract class GameObject {

    protected constructor(
        public transform: Transform,
        public drawer: Drawer,
        public collider?: any,
        private animation?: Animation
    ) {}

    public render(ctx: CanvasRenderingContext2D, camera: Camera) {
        this.drawer.draw(ctx, camera);
    }

    public update(dt: number) {
        if (this.animation) {
            this.animation.update(dt);
        }
    }
}
