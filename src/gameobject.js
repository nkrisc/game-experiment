import { SCENE } from './scene.js';

class GameObject {
    constructor(x, y, type) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.uuid = GameObject.generateUUID();
        this.isOffScreen = function() {
            return !!(this.x > SCENE.width || this.x < 0 || this.y > SCENE.height || this.y < 0);
        };
    }

    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    static isInBounds(x, y) {
        return ((x >= 0 && x < SCENE.width) && (y >= 0 && y < SCENE.height));
    }
}

export { GameObject }