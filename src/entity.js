/**
 * Created by Nathan on 1/31/2016.
 */
import { ObjectList } from './objectlist.js';
import { GameObject } from './gameobject.js';
import { Tile } from './terrain.js';
//TODO combine offscreen and legal move checks into one game area module

const ENTITIES = new ObjectList();

class Entity extends GameObject {
    constructor(type, x, y, updateFunc, state, dir, replenish) {
        super(x, y, type);
        this.state = state || 1;
        this.dir = dir || 0;
        this.energy = 0;
        this.replenish = replenish || 20;
        this.currentAction = null;
        this.uuid = GameObject.generateUUID();

        this.setAction = function(action) {
            this.currentAction = action;
        };

        this.nextAction = function() {
            if (this.currentAction) {
                this.currentAction();
                this.currentAction = null;
                this.energy = 0;
                return true;
            }
            return false;
        };

        this.update = function(self) {
            updateFunc(self);
            if (this.canAct()) {
                this.nextAction();
            } else {
                this.recharge();
            }
        };

        this.canAct = function() {
            return this.energy >= 100;
        };

        this.recharge = function() {
            this.energy += replenish;
        };

        this.canMoveDir = function(dir) {
            switch (dir) {
                case 0:
                    return Tile.isLegalMove(this.x, this.y + 10) && this.canAct();
                case 1:
                    return Tile.isLegalMove(this.x + 10, this.y) && this.canAct();
                case 2:
                    return Tile.isLegalMove(this.x, this.y - 10) && this.canAct();
                case 3:
                    return Tile.isLegalMove(this.x - 10, this.y) && this.canAct();
            }
        };

        this.moveDown = function() {
            this.move(0);
        };

        this.moveRight = function() {
            this.move(1);
        };

        this.moveUp = function() {
            this.move(2);
        };

        this.moveLeft = function() {
            this.move(3);
        };

        this.move = function(dir) {
            this.dir = dir;
            switch (dir) {
                case 0:
                    if (this.canMoveDir(0)) {
                        this.y += 10;
                        return true;
                    }
                    break;
                case 1:
                    if (this.canMoveDir(1)) {
                        this.x += 10;
                        return true;
                    }
                    break;
                case 2:
                    if (this.canMoveDir(2)) {
                        this.y -= 10;
                        return true;
                    }
                    break;
                case 3:
                    if (this.canMoveDir(3)) {
                        this.x -= 10;
                        return true;
                    }
                    break;
            }
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