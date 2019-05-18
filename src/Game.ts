import { Player, PlayerData } from './Player';
import { Config } from './config';
import { Camera } from './Camera';

export class Game {
    config: Config;
    player: Player;
    camera: Camera;
    constructor() {
        this.config = new Config();
        this.player = new Player(new PlayerData(), this);

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.config.game.width, this.config.game.height);
        this.camera.follow(this.player.data.position, this.config.game.width/2, this.config.game.height/2);
    }

    render(ctx: CanvasRenderingContext2D) {
        console.log(this.camera.xView);
        this.player.render(ctx, this.camera.xView, this.camera.yView);
        ctx.rect(20, 20, 150, 100);
        ctx.stroke();
    }

    update(dt: number) {
        this.player.update(dt);
        this.camera.update();
    }
}
