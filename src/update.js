import { Entity } from './entity.js';
import { getPlayer } from './player.js';
import { keyState, getCursorPos } from './input.js';
import { Action } from './action.js';

const QUEUE = [];

function update() {
    //1 sec updates
    /*
    time = Date.now() / 1000;
    if(time - lastTime > 1 ) {
        var fps = (turn / (time - lastTime)).toFixed(0);
        UI.fps(fps); //implement
        lastTime = time;
        turn = 0;
    }
    */
    //turn++;

    function prune() {
        var entities = Entity.all();
        for (var i of entities) {
            let ent = i[1];
            if (ent.state === 0) {
                Entity.destroy(ent.uuid);
            }

        }
    }

    function updateEntities() {
        var entities = Entity.all();
        for (var i of entities) {
            let current = i[1];
            current.update(current);
        }
    }

    //Process player movement event
    //If there's a player action allow updates to advance one step
    function updatePlayerBehavior() {
        var player = getPlayer();
        switch (keyState.arrows[keyState.arrows.length -1]) {
            case 40:
                player.moveDown();
                break;
            case 39:
                player.moveRight();
                break;
            case 38:
                player.moveUp();
                break;
            case 37:
                player.moveLeft();
                break;
        }
        if (keyState.j) {
            Action.shoot(player, player.dir);
        }
    }

    updatePlayerBehavior();
    updateEntities();
    prune();
}

export { update, QUEUE }