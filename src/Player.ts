import { GameObject } from './entities/GameObject';
import { Transform } from './entities/Transform';
import { Drawer } from './entities/Drawer';
import { Tuple } from './utils';
import { Camera } from './entities/Camera';
import { Vector } from './entities/Vector';
import { Game } from './Game';
// @ts-ignore
import { Result } from 'detect-collisions';


class PlayerDrawer extends Drawer {
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.assets.get('player.svg'), -18, -48, 52, 63);
    }
}

export class Player extends GameObject {
    speed: number = 400;
    private damageCollider: any;

    constructor(transform: Transform, public game: Game) {
        super(transform, new PlayerDrawer(transform),
            game.system.createCircle(transform.position.x, transform.position.y, 25));

        this.damageCollider = game.system.createPolygon(transform.position.x, transform.position.y, [
            [-10, -30], [-10, 30], [0, 0]
        ], transform.angle);

        this.listen();
    }

    static directions: Record<string, Tuple> = {
        87: [0, -1],
        65: [-1, 0],
        83: [0, 1],
        68: [1, 0],
    };

    private pressedKeys: Record<string, boolean> = {};

    private nippleDirection


    listen() {
        document.addEventListener('keydown', e => {
            this.pressedKeys[e.keyCode] = true;
        });

        document.addEventListener('keyup', e => {
            this.pressedKeys[e.keyCode] = false;
        });

        document.addEventListener('mousemove', (e: MouseEvent) => {
            const camera: Camera = this.game.camera;
            const v1 = new Vector(e.pageX + camera.xView, e.pageY + camera.yView);
            this.transform.lookAt(v1);
        });

        document.addEventListener('click', (e: MouseEvent) => {
            const wall = this.game.walls.find(wall => {
                const result = new Result();
                return this.damageCollider.collides(wall.collider, result);
            });

            if (wall) {
                wall.takeDamage();
            } else {
                this.game.createPizzaObject(this.transform.position);
            }
        });

        this.game.nipple.on('move', (e, d) => {
            console.log(e, d);
        })
    }

    render(ctx, camera) {
        super.render(ctx, camera);

        if (this.damageCollider) {
            ctx.rotate(-this.transform.angle);
            ctx.translate(
                -this.transform.position.x,
                -this.transform.position.y
            );

            ctx.strokeStyle = 'red';
            ctx.beginPath();
            this.damageCollider.draw(ctx);
            ctx.stroke();


            ctx.setTransform(1, 0, 0, 1, 0, 0)
        }
    }

    get direction(): Vector {
        let vector = Vector.zero();

        Object.keys(Player.directions).forEach(key => {
            const isPressed = this.pressedKeys[key] || false;
            if (isPressed) {
                vector = vector.add(new Vector(...Player.directions[key]))
            }
        });

        return vector;
    }

    update(dt: number) {
        super.update(dt);

        const path = this.direction.multiple(this.speed).multiple(dt);

        this.transform.setPosition(this.transform.position.add(path));
        this.collider.x = this.transform.position.x;
        this.collider.y = this.transform.position.y;

        this.damageCollider.x = this.transform.position.x;
        this.damageCollider.y = this.transform.position.y;
        this.damageCollider.angle = this.transform.angle;

        this.game.riotPolice.forEach(police => {
            const result = new Result();
            if (this.collider.collides(police.collider, result)) {
                const vector = new Vector(-result.overlap * result.overlap_x, -result.overlap * result.overlap_y);
                this.transform.setPosition(
                    this.transform.position.add(vector)
                );
            }
        });

        this.game.walls.forEach(wall => {
            const result = new Result();
            if (this.collider.collides(wall.collider, result)) {
                if (wall.hp <= 0) {
                    return
                }
                const vector = new Vector(-result.overlap * result.overlap_x, -result.overlap * result.overlap_y);
                this.transform.setPosition(
                    // new Vector(0,0)
                    this.transform.position.add(vector)
                );
            }
        });

        this.game.towns.forEach(wall => {
            const result = new Result();
            if (this.collider.collides(wall.collider, result)) {
                const vector = new Vector(-result.overlap * result.overlap_x, -result.overlap * result.overlap_y);
                this.transform.setPosition(
                    // new Vector(0,0)
                    this.transform.position.add(vector)
                );
            }
        });

        this.game.staticObjects.forEach(_static => {
            if (_static.offColider) return;
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

