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

    static angle(v1: Vector, v2: Vector): number {
        return Math.atan2(v1.x - v2.x, -(v1.y - v2.y));
    }

    static distance(v1: Vector, v2: Vector) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }

    static clone(v: Vector) {
        return new Vector(v.x, v.y);
    }

    static turnAround(v: Vector) {
        return new Vector(-v.x, -v.y);
    }
}
