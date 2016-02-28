import { Entity } from './entity.js';
import { Action } from './action.js';

function playerUpdate(self) {
    //self.wait++;
    //self.attackWait++;
    self.energy += 50;
}
var player = new Entity('player', 10, 10, playerUpdate, 1, 0);

function getPlayer() {
    return Entity.findByUUID(player.uuid);
}

export { getPlayer }