/**
 * Created by Nathan on 1/31/2016.
 */
import { ObjectList } from './objectlist.js';
import { GameObject } from './gameobject.js';
import { Tile } from './terrain.js';
//TODO combine offscreen and legal move checks into one game area module

const ENTITIES = new ObjectList();

class Entity extends GameObject {
    constructor(type, x, y, update, state, dir) {
        super(x, y, type, update);
        this.state = state || 1;
        this.dir = dir || 0;
        this.energy = 0;
        this.uuid = GameObject.generateUUID();

        this.canAct = function() {
            return this.energy >= 100;
        };

        this.moveDown = function(steps) {
            this.dir = 0;
            if (Tile.isLegalMove(this.x, this.y + 10) && this.canAct()) {
                this.energy = 0;
                steps = steps || 1;
                this.y += steps * 10;
                return true;
            }
        };

        this.moveRight = function(steps) {
            this.dir = 1;
            if (Tile.isLegalMove(this.x + 10, this.y) && this.canAct()) {
                this.energy = 0;
                steps = steps || 1;
                this.x += steps * 10;
                return true;
            }
        };

        this.moveUp = function(steps) {
            this.dir = 2;
            if (Tile.isLegalMove(this.x, this.y - 10) && this.canAct()) {
                this.energy = 0;
                steps = steps || 1;
                this.y -= steps * 10;
                return true;
            }
        };

        this.moveLeft = function(steps) {
            this.dir = 3;
            if (Tile.isLegalMove(this.x - 10, this.y) && this.canAct()) {
                this.energy = 0;
                steps = steps || 1;
                this.x -= steps * 10;
                return true;
            }
        };

        this.move = function(dir, steps) {
            this.dir = dir;
            this.steps = steps || 1;
            switch (dir) {
                case 0:
                    if (Tile.isLegalMove(this.x, this.y + 10) && this.canAct()) {
                        this.energy = 0;
                        steps = steps || 1;
                        this.y += steps * 10;
                        return true;
                    }
                    break;
                case 1:
                    if (Tile.isLegalMove(this.x + 10, this.y) && this.canAct()) {
                        this.energy = 0;
                        steps = steps || 1;
                        this.x += steps * 10;
                        return true;
                    }
                    break;
                case 2:
                    if (Tile.isLegalMove(this.x, this.y - 10) && this.canAct()) {
                        this.energy = 0;
                        steps = steps || 1;
                        this.y -= steps * 10;
                        return true;
                    }
                    break;
                case 3:
                    if (Tile.isLegalMove(this.x - 10, this.y) && this.canAct()) {
                        this.energy = 0;
                        steps = steps || 1;
                        this.x -= steps * 10;
                        return true;
                    }
                    break;
            }
        }

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