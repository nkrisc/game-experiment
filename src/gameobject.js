import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants.js';

class GameObject {
    constructor(x, y, type, update) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.update = update;
        this.uuid = GameObject.generateUUID();
        this.isOffScreen = function() {
            return !!(this.x > CANVAS_WIDTH || this.x < 0 || this.y > CANVAS_HEIGHT || this.y < 0);
        };
    }

    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    static isInBounds(x, y) {
        return ((x >= 0 && x < CANVAS_WIDTH) && (y >= 0 && y < CANVAS_HEIGHT));
    }
}

export { GameObject }