import { GameObject } from './entities/GameObject';
import { Drawer } from './entities/Drawer';
import { Transform } from './entities/Transform';
import { Vector } from './entities/Vector';
// @ts-ignore
import { Result } from 'collisions';
import { Animation as Animal } from './entities/Animation'

class BossDrawer extends Drawer {
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.assets.get('boss.svg'), -30, -55, 62, 85);
    }
}

class BossAnimation extends Animal {
    constructor(look: number, target: number, private transform: Transform) {
        super(look, target, 500);
    }

    step() {
        this.transform.rotate(this.value);
    }
}

export class Boss extends GameObject {
    speed: number = 20;
    directionVector: Vector = null;
    _transform: Transform;

    constructor(transform: Transform, private game) {
        super(transform, new BossDrawer(transform),
            game.system.createCircle(transform.position.x, transform.position.y, 200));

        this._transform = Transform.clone(transform);

        // @ts-ignore
        window.cosmonaut = this;
    }

    get direction(): Vector {
        if (this.directionVector) {
            return this.directionVector;
        }
        return Vector.zero();
    }

    update(dt: number) {
        super.update(dt);

        const path = this.direction.multiple(this.speed * dt);

        this.transform.setPosition(this.transform.position.add(path));

        this.collider.x = this.transform.position.x;
        this.collider.y = this.transform.position.y;

        const result = new Result();
        if (this.collider.collides(this.game.player.collider, result)) {
            this.directionVector = new Vector(0, -5);
            const vector = new Vector(-result.overlap * result.overlap_x, -result.overlap * result.overlap_y / 2);
            this.transform.setPosition(
                this.transform.position.add(vector)
            );
        }
    }
}
