import { Rectangle } from './Rectangle';

var AXIS = {
    NONE: "none",
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
    BOTH: "both"
};

export class Camera {
    // position of camera (left-top coordinate)
    xView: number;
    yView: number;
    xDeadZone: number;
    yDeadZone: number;
    wView: number;
    hView: number;
    axis: string;
    followed: any;
    viewportRect: Rectangle;
    worldRect: Rectangle;

    constructor(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
        this.xView = xView || 0;
        this.yView = yView || 0;

        // distance from followed object to border before camera starts move
        this.xDeadZone = 0; // min distance to horizontal borders
        this.yDeadZone = 0; // min distance to vertical borders

        // viewport dimensions
        this.wView = canvasWidth;
        this.hView = canvasHeight;

        // allow camera to move in vertical and horizontal axis
        this.axis = AXIS.BOTH;

        // object that should be followed
        this.followed = null;

        // rectangle that represents the viewport
        this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

        // rectangle that represents the world's boundary (room's boundary)
        this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
    }

    follow(gameObject, xDeadZone, yDeadZone) {
        console.log(gameObject, xDeadZone, yDeadZone);
        this.followed = gameObject;
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }

    update() {
        console.log('update');
        // keep following the player (or other desired object)
        console.log(this.followed.position.y, this.followed.position.x, this.yDeadZone, this.axis);
        if (this.followed != null) {
            console.log('update', 1);
            if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
                console.log('update', 2);
                // moves camera on horizontal axis based on followed object position
                if (this.followed.position.x - this.xView + this.xDeadZone > this.wView) {
                    this.xView = this.followed.position.x - (this.wView - this.xDeadZone);
                }
                else if (this.followed.position.x - this.xDeadZone < this.xView) {
                    this.xView = this.followed.position.x - this.xDeadZone;
                }

            }
            if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
                // moves camera on vertical axis based on followed object position
                if (this.followed.position.y - this.yView + this.yDeadZone > this.hView) {
                    console.log('update', 3);
                    this.yView = this.followed.position.y - (this.hView - this.yDeadZone);
                }
                else if (this.followed.position.y - this.yDeadZone < this.yView) {
                    console.log('update', 4);
                    this.yView = this.followed.position.y - this.yDeadZone;
                }
            }

        }

        // update viewportRect
        this.viewportRect.set(this.xView, this.yView);

        // don't let camera leaves the world's boundary
        if (!this.viewportRect.within(this.worldRect)) {
            if (this.viewportRect.left < this.worldRect.left)
                this.xView = this.worldRect.left;
            if (this.viewportRect.top < this.worldRect.top)
                this.yView = this.worldRect.top;
            if (this.viewportRect.right > this.worldRect.right)
                this.xView = this.worldRect.right - this.wView;
            if (this.viewportRect.bottom > this.worldRect.bottom)
                this.yView = this.worldRect.bottom - this.hView;
        }
    }
}
