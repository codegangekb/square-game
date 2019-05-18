import { Vector } from './Vector';
import { Config } from './config';
import { fromEvent } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';


export class PlayerRenderer {
    private fill = '#3aebca';

    constructor(protected data: PlayerData, private config: Config) {
    }

    render(ctx: CanvasRenderingContext2D): void {
        const { game } = this.config;
        ctx.translate(game.width / 2, game.height / 2);
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.arc(this.data.position.x, this.data.position.y, this.data.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export class Player extends PlayerRenderer {
    constructor(data: PlayerData, private game: any) {
        super(data, game.config);
    }

    public update(dt: number) {
        this.data.update(dt);
    }
}

type Tuple = [number, number];

export class PlayerData {
    size: number = 50; // size of body
    speed: number = 0.1;
    direction: Vector = Vector.zero();

    static directions: Record<string, Tuple> = {
        'w': [0, -1],
        'a': [-1, 0],
        's': [0, 1],
        'd': [1, 0],
    };

    constructor(public position: Vector = Vector.zero(), public look: number = 0) {
        fromEvent(document, 'keypress')
            .pipe(distinctUntilKeyChanged<KeyboardEvent>('key'))
            .subscribe((e: KeyboardEvent) => {
                console.log('press');
                const key = e.key.toLowerCase();

                if (PlayerData.directions[key]) {
                    const vector = new Vector(...PlayerData.directions[key]);
                    this.direction = this.direction.add(vector);
                }
            });

        fromEvent(document, 'keyup').subscribe((e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            if (PlayerData.directions[key]) {
                const map = {
                    'w': 's',
                    'a': 'd',
                    's': 'w',
                    'd': 'a',
                };

                const vector = new Vector(...PlayerData.directions[map[key]]);
                this.direction = this.direction.add(vector);
                console.log('change direction up', this.direction, vector);
            }
        });
    }

    rotate(on: number) {
        this.look += on;
    }

    rotateTo(angle: number) {
        this.look = angle;
    }

    move(to: Vector, dt: number = 1) {
        this.position = this.position.add(to.multiple(this.speed).multiple(dt));
    }

    update(dt: number) {
        this.move(this.direction, dt);
    }
}
