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

    //Process player movement event
    //If there's a player action allow updates to advance one step
    var playerAction;
    function updatePlayerBehavior() {
        playerAction = false;
        var player = getPlayer();
        switch (keyState.arrows.current) {
            case 40:
                player.moveDown();
                playerAction = true;
                break;
            case 39:
                player.moveRight();
                playerAction = true;
                break;
            case 38:
                player.moveUp();
                playerAction = true;
                break;
            case 37:
                player.moveLeft();
                playerAction = true;
                break;
        }
        /*
        if (keyState.downArrow) {
            player.moveDown();
            playerAction = true;
        }
        if (keyState.rightArrow) {
            player.moveRight();
            playerAction = true;
        }
        if (keyState.upArrow) {
            player.moveUp();
            playerAction = true;
        }
        if (keyState.leftArrow) {
            player.moveLeft();
            playerAction = true;
        }
        */
        if (keyState.j) {
            Action.shoot(player, player.dir);
            playerAction = true;
        }
    }

    updatePlayerBehavior();
    if (playerAction === true) {
        updateEntities();
        prune();
        playerAction === false;
    }
}

export { update, QUEUE }