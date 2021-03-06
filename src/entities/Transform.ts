import { Vector } from './Vector';

export class Transform {
    constructor(
        private _position: Vector,
        private _angle: number,
        public collider?: any,
        private _scale?: number,
        private _size?: number
    ) {}

    get position() {
        return this._position;
    }

    get angle() {
        return this._angle;
    }

    get size() {
        return this._size;
    }

    rotate(angle: number) {
        this._angle = angle;
    }

    lookAt(vector: Vector) {
        this._angle = Vector.angle(vector, this.position);
    }

    setPosition(vector: Vector) {
        vector = new Vector(Math.floor(vector.x), Math.floor(vector.y));
        this._position = vector;
    }

    static clone(transform: Transform) {
        return new Transform(Vector.clone(transform.position), transform.angle, transform._scale, transform._size);
    }
}
