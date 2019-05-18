import { Vector } from './Vector';

export class Transform {
    constructor(
        private _position: Vector,
        private _angle: number,
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
        this._position = vector;
    }

    static clone(transform: Transform) {
        return new Transform(Vector.clone(transform.position), transform.angle, transform._scale, transform._size);
    }
}
