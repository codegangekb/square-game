import { Player, PlayerData } from './Player';
import { Config } from './config';
import { Camera } from './Camera';
import { Map as GameMap } from './Map';

export class Game {
    player: Player;
    camera: Camera;
    room: { width: number, height: number, map: GameMap };
    constructor(public config: Config) {
        this.player = new Player(new PlayerData(), this);
        this.room = {
            width: 5000,
            height: 3000,
            map: new GameMap(5000, 3000)
        };

        this.room.map.generate();

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.room.width, this.room.height);
        this.camera.follow(this.player.data, this.config.game.width/2, this.config.game.height/2);

    }

    render(ctx: CanvasRenderingContext2D) {
        console.log(this.camera.xView);
        this.room.map.draw(ctx, this.camera.xView, this.camera.yView);
        this.player.render(ctx, this.camera.xView, this.camera.yView);
        // ctx.rect(20, 20, 150, 100);
        // ctx.stroke();
    }

    update(dt: number) {
        this.player.update(dt);
        this.camera.update();

    }
}
