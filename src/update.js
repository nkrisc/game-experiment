import { Entity } from './entity.js';
import { getPlayer } from './player.js';
import { keyState, getCursorPos } from './input.js';
import { Action } from './action.js';
import { uiElements } from './UI.js';

const QUEUE = [];

function update() {
    //1 sec updates
    /*
    time = Date.now() / 1000;
    if(time - lastTime > 1 ) {
        f.textContent = (turn / (time - lastTime)).toFixed(0);
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

    //if(current)console.log(current.event, current.entity, Date.now() /1000)

    //Process player movement event
    function updatePlayerBehavior() {
        var player = getPlayer();
        if (keyState.downArrow) player.moveDown();
        if (keyState.rightArrow) player.moveRight();
        if (keyState.upArrow) player.moveUp();
        if (keyState.leftArrow) player.moveLeft();
        if (keyState.j) Action.shoot(player, player.dir);
    }


    updateEntities();
    prune();
    updatePlayerBehavior();
}

export { update, QUEUE }