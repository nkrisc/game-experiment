import { Entity } from './entity.js';
import { getPlayer } from './player.js';
import { KEY_STATE, getCursorPos } from './input.js';
import { Action } from './action.js';
import { SCENE, offsetX, offsetY } from './scene.js';

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

    function updatePlayerBehavior() {
        var player = getPlayer();
        switch (Array.from(KEY_STATE.arrows.values()).pop()) {
            case 40:
                //If play can move (it will) and player is within 50 of view bottom and view isn't at scene edge
                if (player.moveDown() && player.y >= SCENE.VIEW.bottom() - 50 && SCENE.bottom() !== SCENE.VIEW.bottom()) {
                    console.log('SCENE', SCENE.top(), SCENE.right(), SCENE.bottom(), SCENE.left());
                    console.log('VIEW', SCENE.VIEW.top(), SCENE.VIEW.right(), SCENE.VIEW.bottom(), SCENE.VIEW.left());
                    offsetY(-10);
                }
                break;
            case 39:
                if (player.moveRight() && player.x >= SCENE.VIEW.right() - 50 && SCENE.right() !== SCENE.VIEW.right()) offsetX(-10);
                break;
            case 38:
                if (player.moveUp() && player.y <= SCENE.VIEW.top() + 50 && SCENE.top() !== SCENE.VIEW.top()) offsetY(10);
                break;
            case 37:
                if (player.moveLeft() && player.x <= SCENE.VIEW.left() + 50 && SCENE.left() !== SCENE.VIEW.left()) offsetX(10);
                break;
        }
        if (KEY_STATE.j) {
            Action.shoot(player, player.dir);
        }
    }

    updatePlayerBehavior();
    updateEntities();
    prune();
}

export { update, QUEUE }