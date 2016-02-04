import { GameObject } from './gameobject.js';
import { ObjectList } from './objectlist.js';

const TILES = new ObjectList();
const DECOR = new ObjectList();

class Terrain extends GameObject {
    constructor(x, y, type, update, list) {
        super(x, y, type, update);
        this.list = list;
    }
}

class Tile extends Terrain {
    constructor(x,y, type, update) {
        super(x, y, type, update, TILES);

        this.destroy = function() {
            TILES.remove(this.uuid);
        };
        TILES.add(this);
    }

    static find(x, y) {
        return TILES.find(x, y);
    }

    static findByUUID(uuid) {
        return TILES.get(uuid);
    }

    static all() {
        return TILES.all();
    }

    static isLegalMove(x,y) {
        return Tile.isInBounds(x, y) && !Tile.find(x, y);
    }
}

class Decor extends Terrain {
    constructor(x,y, type, update) {
        super(x, y, type, update);

        this.destroy = function() {
            DECOR.remove(this.uuid);
        };

        DECOR.add(this);
    }

    static find(x, y) {
        DECOR.find(x, y)
    }

    static findByUUID(uuid) {
        return DECOR.get(uuid);
    }

    static all() {
        return DECOR.all();
    }
}

window.tt = Tile.getTile;
window.T = TILES;
export { Tile, Decor }