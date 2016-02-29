import { Entity } from './entity.js';

function addRandomMonster() {
    function update(self) {
        var lastDir = self.dir;
            var move;
            if (Math.random() > 0.35) {
                move = lastDir;
            } else {
                move = Math.floor(Math.random() * 4);
            }
            switch (move) {
                case 0:
                    self.setAction(self.moveDown);
                    break;
                case 1:
                    self.setAction(self.moveRight);
                    break;
                case 2:
                    self.setAction(self.moveUp);
                    break;
                case 3:
                    self.setAction(self.moveLeft);
                    break;
            }
        }
    new Entity('monster', 100, 100, update, 1, 0, 34);
}

addRandomMonster();

export {addRandomMonster }