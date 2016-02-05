import { Tile } from './terrain.js';
import { Entity } from './entity.js';

class Action {
    static shoot(owner, dir) {
        if (owner.attackWait < owner.attackRest) return;
        owner.attackWait = 0;
        var update = function(self) {
            var hit = Tile.find(self.x, self.y);
            if (hit) {
                hit.destroy();
                self.destroy();
            }
            if (self.isOffScreen()) {
                self.destroy();
            }  else if (self.dir === 0) {
                this.y += 10;
            } else if (self.dir === 1) {
                this.x += 10;
            } else if (self.dir === 2) {
                this.y -= 10;
            } else if (self.dir === 3) {
                this.x -= 10;
            }
        };

        new Entity('shot', owner.x, owner.y, update, null, 1, dir);
    };

    static shootArrow(owner, dir) {
        owner.wait = 0;
        var startx = owner.x;
        var starty = owner.y;
        function update(self) {
            var hit = Entity.find(self.x, self.y);
            if (hit && hit.type !== 'player' && hit.uuid !== self.uuid) {
                hit.destroy();
                self.destroy();
            } else if (Tile.find(self.x, self.y)) {
                self.destroy();
            } else if (self.dir === 0) {
                this.y += 10;
            } else if (self.dir === 1) {
                this.x += 10;
            } else if (self.dir === 2) {
                this.y -= 10;
            } else if (self.dir === 3) {
                this.x -= 10;
            }
        }

        new Entity('arrow', owner.x, owner.y, update, null, 1, dir);
    }
}

export { Action }