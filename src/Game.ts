import { Player, PlayerData } from './Player';
import { Config } from './config';

export class Game {
    config: Config;
    player: Player;

    constructor() {
        this.config = new Config();
        this.player = new Player(new PlayerData(), this);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.player.render(ctx);
    }

    update(dt: number) {
        this.player.update(dt)
    }
}
