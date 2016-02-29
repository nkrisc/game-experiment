import { Entity } from './entity.js';
import { Action } from './action.js';

function playerUpdate(self) {
    //self.wait++;
    //self.attackWait++;
}
var player = new Entity('player', 10, 10, playerUpdate, 1, 0, 100);

function getPlayer() {
    return Entity.findByUUID(player.uuid);
}

export { getPlayer }