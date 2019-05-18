import { Player, PlayerData } from './Player';
import { Config } from './config';
import { Camera } from './Camera';
import { Map as GameMap } from './Map';
import { Vector } from './Vector';

export class Game {
    player: Player;
    camera: Camera;
    room: { width: number, height: number, map: GameMap };

    constructor(public config: Config) {
        this.player = new Player(new PlayerData(new Vector(400, 500), 0, this), this);
        this.room = {
            width: config.world.width,
            height: config.world.height,
            map: new GameMap(config.world.width, config.world.height)
        };

        this.room.map.generate();

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.room.width, this.room.height);
        this.camera.follow(this.player.data, this.config.game.width/2, this.config.game.height/2);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.room.map.draw(ctx, this.camera.xView, this.camera.yView);
        this.player.render(ctx, this.camera.xView, this.camera.yView);
    }

    update(dt: number) {
        this.player.update(dt);
        this.camera.update();

    }
}
