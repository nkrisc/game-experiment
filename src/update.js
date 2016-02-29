import { Entity } from './entity.js';
import { getPlayer } from './player.js';
import { KEY_STATE, getCursorPos } from './input.js';
import { Action } from './action.js';
import { SCENE, offsetX, offsetY } from './scene.js';

var ents = Entity.all();
var currentEnt = ents.next();

function update() {

    function prune() {
        var entities = Entity.all();
        for (var i of entities) {
            let ent = i[1];
            if (ent.state === 0) {
                Entity.destroy(ent.uuid);
            }

        }
    }

    /*function updateEntities() {
        var entities = Entity.all();
        for (var i of entities) {
            let current = i[1];
            if (current.type === 'player' && current.canAct() && !current.nextAction) return;
            current.update(current);
        }
    }*/

    function updateEntities() {
        if (currentEnt.done) {
            ents = Entity.all();
            currentEnt = ents.next();
        }
        var current = currentEnt.value[1];
        if (current.type === 'player' && !current.currentAction) {
            return;
        }
        current.update(current);
        currentEnt = ents.next();
    }

    function updatePlayerBehavior() {
        var player = getPlayer();

        switch (KEY_STATE.arrow) {
            case 40:
                player.setAction(player.moveDown);
                KEY_STATE.arrow = null;
                break;
            case 39:
                player.setAction(player.moveRight);
                KEY_STATE.arrow = null;
                break;
            case 38:
                player.setAction(player.moveUp);
                KEY_STATE.arrow = null;
                break;
            case 37:
                player.setAction(player.moveLeft);
                KEY_STATE.arrow = null;
                break;
        }
        if (KEY_STATE.j) {
            Action.shoot(player, player.dir);
        }

        return true;
    }

    //TODO: process entities by energy level (>= 100) then when player is reached wait for input
    updatePlayerBehavior();
    updateEntities();
    prune();
}
window.p = getPlayer();
export { update }