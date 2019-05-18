import { Player, PlayerData } from './Player';
import { Player as NewPlayer } from './Player2';
import { Config } from './config';
import { Camera } from './entities/Camera';
import { Map as GameMap } from './Map';
import { Vector } from './Vector';
import { Transform } from './entities/Transform';

export class Game {
    private newPlayer: NewPlayer;
    player: Player;
    camera: Camera;
    room: { width: number, height: number, map: GameMap };

    constructor(public config: Config) {
        // this.player = new Player(new PlayerData(new Vector(400, 500), 0, this), this);
        this.newPlayer = new NewPlayer(new Transform(new Vector(400, 500), 0, null, 20), this);
        this.room = {
            width: config.world.width,
            height: config.world.height,
            map: new GameMap(config.world.width, config.world.height)
        };

        this.room.map.generate();

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.room.width, this.room.height);
        this.camera.follow(this.newPlayer.transform, this.config.game.width/2, this.config.game.height/2);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.room.map.draw(ctx, this.camera.xView, this.camera.yView);
        this.newPlayer.render(ctx, this.camera);
    }

    update(dt: number) {
        this.newPlayer.update(dt);
        this.camera.update();
    }
}
