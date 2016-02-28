import { Entity } from './entity.js';

function addRandomMonster() {
    function update(self) {
        self.energy += 34;
        var lastDir = self.dir;
        if (self.canAct()) {
            var move;
            if (Math.random() > 0.35) {
                move = lastDir;
            } else {
                move = Math.floor(Math.random() * 4);
            }
            self.move(move);
        }
    }
    new Entity('monster', 100, 100, update, 1, 0);
}

addRandomMonster();

export {addRandomMonster }