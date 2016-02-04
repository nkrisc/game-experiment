import { canvas } from './UI.js';
import { QUEUE } from './update.js';
import { Entity } from './entity.js';
import { addRandomMonster } from './units.js';
import { Action } from './action.js';
import { Tile, Decor } from './terrain.js';
import { getPlayer } from './player.js';

const CURSOR_POS =  { x: 0, y: 0 };

const keyState = {
    arrows: [],
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

function makeKeysFalseExcept(thisone) {
    for (var k in keyState.arrows) {
        console.log(k, keyState.arrows[k]);
        if (k !== thisone) keyState.arrows[k] = false;
    }
}

function inputKeyDown(e) {
    e.preventDefault();

    if (keyState.arrows.indexOf(e.keyCode) === -1 && (e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37)) {
        keyState.arrows.push(e.keyCode)
        console.log(keyState.arrows);
    }

    switch (e.keyCode) {
        case 74:
            keyState.j = true;
            return;
        case 75: keyState.k = true;
    }
}

function inputKeyUp(e) {
    e.preventDefault();

    if (e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37) {
        keyState.arrows.splice(keyState.arrows.indexOf(e.keyCode),1);
        console.log(keyState.arrows);
    }

    switch (e.keyCode) {
        case 74:
            keyState.j = false;
            break;
        case 75:
            keyState.k = false;
            break;
    }
    if (keyState.arrows.downArrow === false &&
        keyState.arrows.rightArrow === false &&
        keyState.arrows.upArrow === false &&
        keyState.arrows.leftArrow === false
    ) {
        keyState.arrows.current = null;
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
