import { Player } from './Player';
import { Config } from './config';
import { Camera } from './entities/Camera';
import { Map as GameMap } from './Map';
import { Vector } from './entities/Vector';
import { Cosmonaut } from './Cosmonaut';
import { Pizza } from './Pizza';
import { Transform } from './entities/Transform';
// @ts-ignore
import {Collisions} from 'detect-collisions';
import { Wall } from './Wall';
import { WALLS_LIST } from './objects/wall';
import { TOWN_LIST } from './objects/town';
import { Town } from './Town';
import { StaticObject } from './StaticObject';
import { Boss } from './Boss';

export class Game {
    player: Player;
    camera: Camera;
    room: { width: number, height: number, map: GameMap };
    riotPolice: Cosmonaut[] = [];
    pizzas: Pizza[] = [];
    system;
    walls: Array<Wall>;
    towns: Array<Town>;
    staticObjects: StaticObject[] = [];
    boss: Boss;
    constructor(public config: Config) {
        this.system = new Collisions();
        this.player = new Player(new Transform(new Vector(2050, 1650), 0), this);
        this.room = {
            width: config.world.width,
            height: config.world.height,
            map: new GameMap(config.world.width, config.world.height)
        };

        this.createRiotPolice();
        this.room.map.generate();

        this.camera = new Camera(0, 0, this.config.game.width, this.config.game.height, this.room.width, this.room.height);
        this.camera.follow(this.player.transform, this.config.game.width / 2, this.config.game.height / 2);
        this.createWalls();
        this.createTowns();
        this.createStatic();
        this.boss = new Boss(new Transform(new Vector(3400, 1300), Math.PI * 1.5), this);

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
        this.boss.render(ctx, this.camera);
        this.renderRiotPolice(ctx);
        this.renderPizzas(ctx);
        this.renderWalls(ctx);
        this.renderTowns(ctx);
        this.renderStatic(ctx);
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
        this.boss.update(dt);
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
        Array.from({length: 24}).forEach((_, i) => {
            const transform = new Transform(new Vector(2150, 760 + 40 * i + 1), Math.PI * 1.5);
            const cosmonaut = new Cosmonaut(transform, this);
            this.riotPolice.push(cosmonaut);
        });
    }

    eatPizza(pizza: Pizza) {
        const index = this.pizzas.findIndex(_pizza => _pizza.id === pizza.id);
        if (index !== -1) {
            this.pizzas.splice(index, 1);
        }
    }

    createPizzaObject(position: Vector) {
        if (this.pizzas.length >= 5) return;
        this.pizzas.push(new Pizza(new Transform(new Vector(position.x, position.y), 0)));
        this.searchIntersection();
    }

    createWalls() {
        this.walls = WALLS_LIST.map((_wall, i) => {
            const vector = new Vector(_wall.x, _wall.y);
            const transform = new Transform(vector, _wall.rotate);
            return new Wall(transform, this);
        });
    }

    renderWalls(ctx: CanvasRenderingContext2D) {
        this.walls.forEach(wall => wall.render(ctx, this.camera));
    }

    createTowns() {
        this.towns = TOWN_LIST.map((_town, i) => {
            const vector = new Vector(_town.x, _town.y);
            const transform = new Transform(vector, _town.rotate);
            const town = new Town(transform, this);

            return town;
        });
    }

    renderTowns(ctx) {
        this.towns.forEach(town => town.render(ctx, this.camera));
    }


    createStatic() {
        this.staticObjects.push(new StaticObject('public/salsa.svg', 89, 89, Math.PI * 1.5, new Vector(1550, 1250), this));
        this.staticObjects.push(new StaticObject('public/dodo.svg', 50, 70, Math.PI * 0.4, new Vector(1350, 1420), this));
        this.staticObjects.push(new StaticObject('public/sheremet.svg', 120, 120, 0, new Vector(1650, 1520), this));
        this.staticObjects.push(new StaticObject('public/ten-gubernatora.svg', 70, 70, 0, new Vector(1380, 1660), this));
        this.staticObjects.push(new StaticObject('public/maxim_menailo.svg', 90, 90, 0, new Vector(1350, 980), this));
        this.staticObjects.push(new StaticObject('public/devi-u-popa.svg', 50, 90, Math.PI * 0.2, new Vector(1396, 1020), this));
        this.staticObjects.push(new StaticObject('public/roizman.svg', 120, 120, 0, new Vector(1280, 1520), this));
        this.staticObjects.push(new StaticObject('public/mer.svg', 160, 160, 0, new Vector(1860, 1780), this));
        this.staticObjects.push(new StaticObject('public/rinat.svg', 70, 70, 0, new Vector(1750, 1230), this));
        this.staticObjects.push(new StaticObject('public/tsarikov.svg', 55, 85, 0, new Vector(1780, 1130), this));
        this.staticObjects.push(new StaticObject('public/naum-blik.svg', 55, 85, 0, new Vector(2040, 890), this));
        this.staticObjects.push(new StaticObject('public/ded.svg', 180, 130, 0, new Vector(1895, 1450), this));
        this.staticObjects.push(new StaticObject('public/deva-vesna.svg', 70, 90, 0, new Vector(1895, 1250), this));
        this.staticObjects.push(new StaticObject('public/shahrin.svg', 90, 90, 0, new Vector(1350, 650), this));
        this.staticObjects.push(new StaticObject('public/grupa2.svg', 150, 150, 0, new Vector(1350, 850), this));
        this.staticObjects.push(new StaticObject('public/grupa2.svg', 150, 150, 0, new Vector(850, 980), this));
        this.staticObjects.push(new StaticObject('public/grupa2.svg', 150, 150, 0, new Vector(1780, 1450), this));
        this.staticObjects.push(new StaticObject('public/devi-u-popa.svg', 50, 90, Math.PI * 0.2, new Vector(950, 980), this));

        this.staticObjects.push(new StaticObject('public/titushki.svg', 400, 400, Math.PI * 1.5, new Vector(3550, 1300), this, true));
        this.staticObjects.push(new StaticObject('public/we.svg', 190, 215, Math.PI * 1.9, new Vector(350, 1300), this, true));
        this.staticObjects.push(new StaticObject('public/yandex-eda-tri-parnya.svg', 200, 85, Math.PI * 1.9, new Vector(550, 1300), this, true));
        this.staticObjects.push(new StaticObject('public/yandex-eda-tri-parnya.svg', 200, 85, Math.PI * 1.9, new Vector(690, 820), this, true));
        this.staticObjects.push(new StaticObject('public/dodo.svg', 50, 70, Math.PI * 0.4, new Vector(850, 720), this));
        this.staticObjects.push(new StaticObject('public/grupa2.svg', 150, 150, Math.PI * 1.15, new Vector(940, 720), this));
        this.staticObjects.push(new StaticObject('public/human.svg', 95, 95, 0, new Vector(940, 960), this));
        this.staticObjects.push(new StaticObject('public/human.svg', 95, 95, 0, new Vector(1780, 1024), this));
        this.staticObjects.push(new StaticObject('public/human.svg', 95, 95, 0, new Vector(1880, 1144), this));
        this.staticObjects.push(new StaticObject('public/human.svg', 95, 95, 0, new Vector(750, 1300), this));


    }

    renderStatic(ctx: CanvasRenderingContext2D) {


        this.staticObjects.forEach(_ => _.render(ctx, this.camera));
    }
}
