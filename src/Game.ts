import { Player, PlayerData } from './Player';
import { Config } from './config';
import { Camera } from './Camera';
import { Map as GameMap } from './Map';
import { Vector } from './Vector';
import { RiotPolice, RiotPoliceData } from './RiotPolice';
import { Pizza, PizzaData } from './Pizza';

export class Game {
    player: Player;
    camera: Camera;
    room: { width: number, height: number, map: GameMap };
    riotPolice: RiotPolice[] = [];
    pizzas: Pizza[] = [];

    constructor(public config: Config) {
        this.player = new Player(new PlayerData(new Vector(400, 500), 0, this), this);
        this.room = {
            width: config.world.width,
            height: config.world.height,
            map: new GameMap(config.world.width, config.world.height)
        };

        this.createRiotPolice();
        this.room.map.generate();

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.room.width, this.room.height);
        this.camera.follow(this.player.data, this.config.game.width/2, this.config.game.height/2);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.room.map.draw(ctx, this.camera.xView, this.camera.yView);
        this.player.render(ctx, this.camera.xView, this.camera.yView);
        this.renderRiotPolice(ctx);
        this.renderPizzas(ctx);
    }

    searchIntersection() {
        this.riotPolice.forEach(kosmonavt => kosmonavt.data.target = this.pizzas[0] && this.pizzas[0].data.position)
    }

    update(dt: number) {
        this.player.update(dt);
        this.searchIntersection();
        this.updateRiotPolice(dt);
        this.camera.update();
    }

    renderRiotPolice(ctx: CanvasRenderingContext2D) {
        this.riotPolice.forEach((_) => {
           _.render(ctx, this.camera.xView, this.camera.yView);
        });
    }

    updateRiotPolice(dt: number) {
        this.riotPolice.forEach((_) => {
            _.update(dt);
        });
    }

    renderPizzas(ctx: CanvasRenderingContext2D) {
        this.pizzas.forEach(_ => {
            _.render(ctx, this.camera.xView - 10, this.camera.yView - 10);
        })
    }

    createRiotPolice() {
        Array.from({ length: 5 }).forEach((_, i) => {
           this.riotPolice.push(new RiotPolice(new RiotPoliceData(new Vector(500 + 80 * i + 1, 600)), this));
        });
    }

    createPizzaObject(position: Vector) {
        this.pizzas.push(new Pizza(new PizzaData(new Vector(position.x, position.y)), this));
    }
}
