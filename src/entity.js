/**
 * Created by Nathan on 1/31/2016.
 */
import { isLegalMove } from './terrain.js'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants.js';
import { ObjectList } from './objectlist.js';
import { GameObject } from './gameobject.js';
import { Tile } from './terrain.js';

const ENTITIES = new ObjectList();

class Entity extends GameObject {
    constructor(type, x, y, update, rest, state, dir) {
        super(x, y, type, update);
        this.rest = rest || 10;
        this.attackRest = rest || 10;
        this.state = state || 1;
        this.dir = dir || 0;
        this.wait = 0;
        this.attackWait = 0;
        this.uuid = GameObject.generateUUID();

        this.moveDown = function(steps) {
            if (Tile.isLegalMove(this.x, this.y + 10) && this.wait >= this.rest) {
                this.wait = 0;
                steps = steps || 1;
                this.y += steps * 10;
            }
            this.dir = 0;
        };

        this.moveRight = function(steps) {
            if (Tile.isLegalMove(this.x + 10, this.y) && this.wait >= this.rest) {
                this.wait = 0;
                steps = steps || 1;
                this.x += steps * 10;
            }
            this.dir = 1;
        };

        this.moveUp = function(steps) {
            if (Tile.isLegalMove(this.x, this.y - 10) && this.wait >= this.rest) {
                this.wait = 0;
                steps = steps || 1;
                this.y -= steps * 10;
            }
            this.dir = 2;
        };

        this.moveLeft = function(steps) {
            if (Tile.isLegalMove(this.x - 10, this.y) && this.wait >= this.rest) {
                this.wait = 0;
                steps = steps || 1;
                this.x -= steps * 10;
            }
            this.dir = 3;
        };

        this.isOffScreen = function() {
            return !!(this.x > CANVAS_WIDTH || this.x < 0 || this.y > CANVAS_HEIGHT || this.y < 0);
        };

        this.destroy = function() {
            ENTITIES.remove(this.uuid);
        };

        return ENTITIES.add(this);
    }



    static find(x, y) {
        return ENTITIES.find(x, y)
    }

    static findByUUID(uuid) {
        return ENTITIES.get(uuid);
    }

    static all() {
        return ENTITIES.all();
    }

}

window.E = ENTITIES;

export { Entity }