import * as Terrain from './terrain.js';
import { Entity } from './entity.js';
import { draw } from './draw.js';
import { update } from './update.js';
import * as constants from './constants.js';
import * as handler from './input.js';
import './units.js';

function init() {
    //var tile = document.getElementById('tile');
    //var mousex = document.getElementById('mousex');
    //var mousey = document.getElementById('mousey');
    //var f = document.getElementById('fps');
    //var queue = [];

    //var canvas = getCanvas('scene');
    window.requestAnimationFrame(main);

    function main() {
        update();
        draw();
        window.requestAnimationFrame(main);
    }
}

var $game;
document.addEventListener('DOMContentLoaded', init);