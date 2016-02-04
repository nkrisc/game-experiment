import { Entity } from './entity.js';

function addRandomMonster() {
    function randoUpdate(self) {
        self.wait++;
        var lastDir = self.dir;
        if (self.wait >= self.rest) {
            var move;
            if (Math.random() > 0.35) {
                move = lastDir;
            } else {
                move = Math.floor(Math.random() * 4);
            }
            if (move === 0) self.moveDown();
            if (move === 1) self.moveRight();
            if (move === 2) self.moveUp();
            if (move === 3) self.moveLeft();
            self.wait = 0;
        }
    }
    new Entity('monster', 100, 100, randoUpdate, 15, 1, 0);
}

addRandomMonster();

export {addRandomMonster }