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
        this.player = new Player(new PlayerData(new Vector(1850, 1250), 0, this), this);
        this.room = {
            width: config.world.width,
            height: config.world.height,
            map: new GameMap(config.world.width, config.world.height)
        };

        this.createRiotPolice();
        this.room.map.generate();

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.room.width, this.room.height);
        this.camera.follow(this.player.data, this.config.game.width / 2, this.config.game.height / 2);
    }

    renderSquare(ctx: CanvasRenderingContext2D) {
        const img = new Image();
        img.src = 'public/square.png';
        ctx.drawImage(img, -this.camera.xView, -this.camera.yView, img.width/1.8, img.height/1.8);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.renderSquare(ctx);
        // this.room.map.draw(ctx, this.camera.xView, this.camera.yView);
        this.player.render(ctx, this.camera.xView, this.camera.yView);
        this.renderRiotPolice(ctx);
        this.renderPizzas(ctx);
    }

    searchIntersection() {
        const availablePizzas: Map<Pizza, { kosmonavt: RiotPolice, distance: number }[]> = new Map();
        if (this.pizzas.length) {
            this.pizzas.forEach(pizza => {
                this.riotPolice.forEach(kosmonavt => {
                    const distance = Vector.distance(kosmonavt.data.position, pizza.data.position);
                    if (Vector.distance(kosmonavt.data.position, pizza.data.position) < 800 && !pizza.isWaitingToEating && !kosmonavt.data.target) {
                        //
                        //
                        if (availablePizzas.has(pizza)) {
                            availablePizzas.get(pizza).push({ kosmonavt, distance });
                        } else {
                            availablePizzas.set(pizza, [{ kosmonavt, distance }])
                        }
                    }
                });
            });
            if (availablePizzas.size) {
                for (let [key, value] of availablePizzas) {
                    const minDistance = value.reduce((min, p) => p.distance < min ? p.distance : min, value[0].distance);
                    const { kosmonavt } = value.find(kosmonavt => kosmonavt.distance === minDistance);
                    kosmonavt.data.target = key;
                    key.isWaitingToEating = true;
                }
            }
        }
    }

    update(dt: number) {
        this.player.update(dt);
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
        Array.from({length: 9}).forEach((_, i) => {
            this.riotPolice.push(new RiotPolice(new RiotPoliceData(new Vector(2150, 900 + 80 * i + 1), Math.PI * 1.5, this), this));
        });
    }

    eatPizza(pizza: Pizza) {
        const index = this.pizzas.findIndex(_pizza => _pizza.id === pizza.id);
        console.log(index);
        if (index !== -1) {
            this.pizzas.splice(index, 1);
        }
    }

    createPizzaObject(position: Vector) {
        if (this.pizzas.length >= 5) return;
        this.pizzas.push(new Pizza(new PizzaData(new Vector(position.x, position.y)), this));
        this.searchIntersection();
    }
}
