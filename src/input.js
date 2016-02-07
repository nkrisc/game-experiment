import { canvas } from './UI.js';
import { Entity } from './entity.js';
import { addRandomMonster } from './units.js';
import { Action } from './action.js';
import { Tile, Decor } from './terrain.js';

const KEY_STATE = {
    arrows: new Set(),
    ctrl: false,
    shift: false,
    alt: false,
    j: false,
    k: false
};

const CURSOR_STATE = {
    x: -10,
    y: -10,
    leftButtonDown: false,
    rightButtonDown: false,
    drag: false,
    dragStartX: 0,
    dragStartY: 0,
    dragArea: {
        width: 0,
        height: 0,
        x: 0,
        y: 0
    }

};

/* Queue deprecated for time being, no current need for GameEvent
class GameEvent {
    constructor(entity, event, value) {
        this.entity = entity;
        this.event = event;
        this.value = value;
    }
}
*/

function mouseDown(e) {
    switch(e.button) {
        case 0:
            CURSOR_STATE.leftButtonDown = true;
            break;
        case 1:
            CURSOR_STATE.rightButtonDown = true;
    }
}

function mouseUp(e) {
    switch(e.button) {
        case 0:
            CURSOR_STATE.leftButtonDown = false;
            break;
        case 1:
            CURSOR_STATE.rightButtonDown = false;
    }
}

function mouseMove(e) {
    var m = mouseToGrid(e);
    CURSOR_STATE.x = m.x;
    CURSOR_STATE.y = m.y;

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

/* Replaced for time being
TODO: move functions to new event handler, combine event handlers
function canvasClick(e){
    e.preventDefault();
    var m = CURSOR_STATE;
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
*/

function inputKeyDown(e) {
    e.preventDefault();

    if (e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37) {
        KEY_STATE.arrows.add(e.keyCode);
    }

    switch (e.keyCode) {
        case 74:
            KEY_STATE.j = true;
            return;
        case 75: KEY_STATE.k = true;
    }
}

function inputKeyUp(e) {
    e.preventDefault();

    KEY_STATE.arrows.delete(e.keyCode);

    switch (e.keyCode) {
        case 74:
            KEY_STATE.j = false;
            break;
        case 75:
            KEY_STATE.k = false;
            break;
    }
}

function getCursorPos() {
    return { x: CURSOR_STATE.x, y: CURSOR_STATE.y }
}

//Tile click and drag functions
function onDragStart() {
    //track cursor tile location on mousedown
    CURSOR_STATE.dragStartX = CURSOR_STATE.x;
    CURSOR_STATE.dragStartY = CURSOR_STATE.y;
}
function getDragDirection() {
    //Has mouse travelled more in the X or in the Y direction?
    //1 for y axis, 2 for x axis. positive or negative
    var sx = CURSOR_STATE.dragStartX,
        cx = CURSOR_STATE.x,
        sy = CURSOR_STATE.dragStartY,
        cy = CURSOR_STATE.y,
        dAxis;

    //Check for larger axis delta
    (Math.abs(sx - cx) > Math.abs(sy - cy)) ? dAxis = 2 : dAxis = 1;

    //Find direction on axis
    if (dAxis === 1) {
        //If current Y value is smaller than start Y, cursor moved in negative Y direction
        if (cy < sy) {
            dAxis *= -1
        }
        //If it's not smaller, leave dAxis as it was a move in the positive direction
    } else {
        if (cx < sx) {
            dAxis *= -1
        }
    }
    return dAxis
}

function onDrag() {
    //Goes on mousemove. if mouse is still down leaves drag start tile, it is a drag
    if (CURSOR_STATE.leftButtonDown === true &&
            (CURSOR_STATE.x !== CURSOR_STATE.dragStartX ||
            CURSOR_STATE.y !== CURSOR_STATE.dragStartY)) {
        CURSOR_STATE.drag = true;
    }
    if (CURSOR_STATE.drag) {
        var da = CURSOR_STATE.dragArea;
        var dir = getDragDirection(),
            sx = CURSOR_STATE.dragStartX,
            cx = CURSOR_STATE.x,
            sy = CURSOR_STATE.dragStartY,
            cy = CURSOR_STATE.y;
        //console.log('cx', cx, 'cy', cy);

        switch (dir) {
            case 1:
                //positive Y
                da.height = Math.abs(cy - sy);
                da.width = 10;
                da.x = sx;
                da.y = sy;
                break;
            case -1:
                //negative Y
                da.height = Math.abs(cy - sy) + 10;
                da.width = 10;
                da.x = sx;
                da.y = cy;
                break;
            case 2:
                // positive X
                da.height = 10;
                da.width = Math.abs(cx - sx);
                da.x = sx;
                da.y = sy;
                break;
            case -2:
                //negative X
                da.height = 10;
                da.width = Math.abs(cx - sx) + 10;
                da.x = cx;
                da.y = sy;
                break;
        }
    }
}

function onDragRelease(e) {
    if (e.button === 0 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        if (CURSOR_STATE.drag) {
            CURSOR_STATE.drag = false;
            var da = CURSOR_STATE.dragArea;
            console.log(da.x, da.width, da.y, da.height);
            for (var x = 0; x < da.width / 10; x++) {
                for (var y = 0; y < da.height / 10; y++) {
                    var tx = x * 10 + da.x;
                    var ty = y * 10 + da.y;
                    new Tile(tx, ty, 'obstacle');
                }
            }
        } else {
            new Tile(CURSOR_STATE.x, CURSOR_STATE.y, 'obstacle');
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
    canvas.oncontextmenu = function () {
        return false
    };
    //canvas.addEventListener('mousedown', canvasClick);

    window.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mousedown', onDragStart);

    window.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mouseup', onDragRelease);

    window.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousemove', onDrag);

    window.addEventListener('keydown', inputKeyDown);
    window.addEventListener('keyup', inputKeyUp);
});

window.C = CURSOR_STATE;
export { getCursorPos, KEY_STATE, CURSOR_STATE }
