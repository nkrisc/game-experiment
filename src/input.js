import { canvas } from './UI.js';
import { QUEUE } from './update.js';
import { Entity } from './entity.js';
import { addRandomMonster } from './units.js';
import { Action } from './action.js';
import { Tile, Decor } from './terrain.js';
import { getPlayer } from './player.js';

const CURSOR_POS =  { x: 0, y: 0 };
const keyState = {
    downArrow: false,
    rightArrow: false,
    upArrow: false,
    leftArrow: false,
    ctrl: false,
    shift: false,
    alt: false,
    j: false,
    k: false
};

class GameEvent {
    constructor(etity, event, value) {
        this.entity = entity;
        this.event = event;
        this.value = value;
    }
}

function mouseMove(e) {
    var m = mouseToGrid(e);
    CURSOR_POS.x = m.x;
    CURSOR_POS.y = m.y;

    //mousex.textContent = m.x;
    //mousey.textContent = m.y;

    //var T = terrain.getTile(m.x, m.y);
    //tile.textContent = T ? terrain.getTile(m.x, m.y).type : '';
}

function mouseToGrid(e) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    x = Math.floor(x / 10) * 10;
    y = Math.floor(y / 10) * 10;
    return {x: x, y: y}
}

function canvasClick(e){
    e.preventDefault();
    var m = mouseToGrid(e);
    if (e.button === 0 && e.shiftKey === false && e.ctrlKey === false && e.altKey === false) {
        new Tile(m.x, m.y, 'obstacle');
    } else if (e.button === 0 && e.shiftKey === true) {
        new Tile(m.x, m.y, 'door');
    } else if (e.button === 2 && e.ctrlKey === false) {
        Tile.find(m.x, m.y).destroy();
    }  else if (e.button === 0 && e.altKey === true) {
        new Decor(m.x, m.y, 'floor');
    } else if (e.button === 2 && e.ctrlKey === true) {
        addRandomMonster();
    }
}

function inputKeys(e) {
    e.preventDefault();
    var player = getPlayer();
    if (e.keyCode === 40) {
        QUEUE.push(new GameEvent(player, 'move', 'down'));
    } else if (e.keyCode === 39) {
        QUEUE.push(new GameEvent(player, 'move', 'right'));
    } else if (e.keyCode === 38) {
        QUEUE.push(new GameEvent(player, 'move', 'up'));
    } else if (e.keyCode === 37) {
        QUEUE.push(new GameEvent(player, 'move', 'left'));
    } else if (e.keyCode === 74) {
        if (player.wait >= player.rest) QUEUE.push(new GameEvent(Action.shoot(player, player.dir), 'action', null)); //hardcoded to player
    } else if (e.keyCode === 75) {
        if (player.wait >= player.rest) QUEUE.push(new GameEvent(Action.shootArrow(player, player.dir), 'action', null));
    }
}

function inputKeyDown(e) {
    switch (e.keyCode) {
        case 40:
            keyState.downArrow = true;
            return;
        case 39:
            keyState.rightArrow = true;
            return;
        case 38:
            keyState.upArrow = true;
            return;
        case 37:
            keyState.leftArrow = true;
            return;
        case 74:
            keyState.j = true;
            return;
        case 75: keyState.k = true;
    }
}

function inputKeyUp(e) {
    switch (e.keyCode) {
        case 40:
            keyState.downArrow = false;
            return;
        case 39:
            keyState.rightArrow = false;
            return;
        case 38:
            keyState.upArrow = false;
            return;
        case 37:
            keyState.leftArrow = false;
            return;
        case 74:
            keyState.j = false;
            return;
        case 75: keyState.k = false;
    }
}

function getCursorPos() {
    return { x: CURSOR_POS.x, y: CURSOR_POS.y }
}


window.addEventListener('DOMContentLoaded', function() {
    canvas.oncontextmenu = function () {
        return false
    };
    canvas.addEventListener('mousedown', canvasClick);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('keydown', inputKeyDown);
    window.addEventListener('keyup', inputKeyUp);
});

export { getCursorPos, keyState }
