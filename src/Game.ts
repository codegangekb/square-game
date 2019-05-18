import { Player } from './Player';
import { Config } from './config';
import { Camera } from './entities/Camera';
import { Map as GameMap } from './Map';
import { Vector } from './entities/Vector';
import { Cosmonaut } from './Cosmonaut';
import { Pizza } from './Pizza';
import { Transform } from './entities/Transform';
// @ts-ignore
import Collisions from 'collisions';
import { Wall } from './Wall';
import { WALLS_LIST } from './objects/wall';
import { TOWN_LIST } from './objects/town';
import { Town } from './Town';

export class Game {
    player: Player;
    camera: Camera;
    room: { width: number, height: number, map: GameMap };
    riotPolice: Cosmonaut[] = [];
    pizzas: Pizza[] = [];
    system;

    constructor(public config: Config) {
        this.system = new Collisions();
        this.player = new Player(new Transform(new Vector(1850, 1250), 0), this);
        this.room = {
            width: config.world.width,
            height: config.world.height,
            map: new GameMap(config.world.width, config.world.height)
        };

        this.createRiotPolice();
        this.room.map.generate();

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.room.width, this.room.height);
        this.camera.follow(this.player.transform, this.config.game.width / 2, this.config.game.height / 2);


        // @ts-ignore
        window.game = this;
    }

    renderSquare(ctx: CanvasRenderingContext2D) {
        const img = new Image();
        img.src = 'public/square.png';
        ctx.drawImage(img, -this.camera.xView, -this.camera.yView, img.width/1.8, img.height/1.8);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.renderSquare(ctx);
        // this.room.map.draw(ctx, this.camera.xView, this.camera.yView);
        this.player.render(ctx, this.camera);
        this.renderRiotPolice(ctx);
        this.renderPizzas(ctx);
        this.createWalls(ctx);
        this.createTowns(ctx);
    }

    searchIntersection() {
        const availablePizzas: Map<Pizza, { cosmonaut: Cosmonaut, distance: number }[]> = new Map();
        if (this.pizzas.length) {
            this.pizzas.forEach(pizza => {
                this.riotPolice.forEach(cosmonaut => {
                    const distance = Vector.distance(cosmonaut.transform.position, pizza.transform.position);
                    if (Vector.distance(cosmonaut.transform.position, pizza.transform.position) < 800 &&
                        !pizza.isWaitingToEating && !cosmonaut.target) {
                        //
                        //
                        if (availablePizzas.has(pizza)) {
                            availablePizzas.get(pizza).push({ cosmonaut: cosmonaut, distance });
                        } else {
                            availablePizzas.set(pizza, [{ cosmonaut: cosmonaut, distance }])
                        }
                    }
                });
            });
            if (availablePizzas.size) {
                for (let [key, value] of availablePizzas) {
                    const minDistance = value.reduce((min, p) => p.distance < min ? p.distance : min, value[0].distance);
                    const { cosmonaut } = value.find(cosmonaut => cosmonaut.distance === minDistance);
                    cosmonaut.target = key;
                    key.isWaitingToEating = true;
                }
            }
        }
    }

    update(dt: number) {
        this.system.update();

        this.player.update(dt);
        this.updateRiotPolice(dt);
        this.camera.update();
    }

    renderRiotPolice(ctx: CanvasRenderingContext2D) {
        this.riotPolice.forEach((_) => {
            _.render(ctx, this.camera);
        });
    }

    updateRiotPolice(dt: number) {
        this.riotPolice.forEach((_) => {
            _.update(dt);
        });
    }

    renderPizzas(ctx: CanvasRenderingContext2D) {
        this.pizzas.forEach(_ => {
            _.render(ctx, this.camera);
        })
    }

    createRiotPolice() {
        Array.from({length: 1}).forEach((_, i) => {
            const transform = new Transform(new Vector(2150, 900 + 80 * i + 1), Math.PI * 1.5);
            const cosmonaut = new Cosmonaut(transform, this);
            this.riotPolice.push(cosmonaut);
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
        this.pizzas.push(new Pizza(new Transform(new Vector(position.x, position.y), 0)));
        this.searchIntersection();
    }

    createWalls(ctx: CanvasRenderingContext2D) {
        WALLS_LIST.forEach((_wall, i) => {
            const vector = new Vector(_wall.x, _wall.y);
            const transform = new Transform(vector, _wall.rotate);
            const wall = new Wall(transform);
            wall.render(ctx, this.camera);
        });
    }

    createTowns(ctx: CanvasRenderingContext2D) {
        TOWN_LIST.forEach((_town, i) => {
            const vector = new Vector(_town.x, _town.y);
            const transform = new Transform(vector, _town.rotate);
            const town = new Town(transform);
            town.render(ctx, this.camera);
        });
    }
}
