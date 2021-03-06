import { GameObject } from './entities/GameObject';
import { Drawer } from './entities/Drawer';
import { Transform } from './entities/Transform';
import { Vector } from './entities/Vector';
import { Pizza } from './Pizza';
import { getRandomBeetwen } from './utils';
// @ts-ignore
import { Result } from 'collisions';

class CosmonautDrawer extends Drawer {
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.assets.get('cosmonaut.svg'), -30, -55, 62, 85);
    }
}

export class Cosmonaut extends GameObject {
    speed: number = getRandomBeetwen(70, 100);
    target: GameObject = null;
    _transform: Transform;

    constructor(transform: Transform, private game) {
        super(transform, new CosmonautDrawer(transform),
            game.system.createCircle(transform.position.x, transform.position.y, 15));

        this._transform = Transform.clone(transform);

        // @ts-ignore
        window.cosmonaut = this;
    }

    get direction(): Vector {
        let vector = Vector.zero();
        const position = this.target ? this.target.transform.position : this._transform.position;

        if (Vector.distance(this.transform.position, position) >= 5) {
            vector = position.sub(this.transform.position);
            this.transform.lookAt(position);
        } else {
            if (this.target) {
                this.game.eatPizza(this.target as Pizza);
                this.target = null;
            }
            this.transform.rotate(this._transform.angle);
        }
        return vector.normalize();
    }

    update(dt: number) {
        super.update(dt);

        const path = this.direction.multiple(this.speed * dt);

        this.transform.setPosition(this.transform.position.add(path));

        this.collider.x = this.transform.position.x;
        this.collider.y = this.transform.position.y;

        this.game.walls.forEach(wall => {
            const result = new Result();
            if (this.collider.collides(wall.collider, result)) {
                if (wall.hp <= 0) {
                    return
                }
                const vector = new Vector(-result.overlap * result.overlap_x, -result.overlap * result.overlap_y + 5);
                this.transform.setPosition(
                    // new Vector(0,0)
                    this.transform.position.add(vector)
                );
            }
        });

        this.game.towns.forEach(wall => {
            const result = new Result();
            if (this.collider.collides(wall.collider, result)) {
                const vector = new Vector(-result.overlap * result.overlap_x, -result.overlap * result.overlap_y + 5);
                this.transform.setPosition(
                    // new Vector(0,0)
                    this.transform.position.add(vector)
                );
            }
        });

        this.game.staticObjects.forEach(_static => {
            const result = new Result();
            if (this.collider.collides(_static.static.collider, result)) {
                const vector = new Vector(-result.overlap * result.overlap_x, -result.overlap * result.overlap_y);
                this.transform.setPosition(
                    this.transform.position.add(vector)
                );
            }
        });
    }
}
