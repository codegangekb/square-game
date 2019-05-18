export class Vector {
    constructor(public x: number, public y: number) {
    }

    add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    multiple(factor: number, yFactor ?: number): Vector {
        return new Vector(this.x * factor, this.y * (yFactor != null ? yFactor : factor));
    }

    static zero() {
        return new Vector(0, 0)
    }
}
