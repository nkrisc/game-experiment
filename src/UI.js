import * as constants from './constants.js';
var canvas, ctx;
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, constants.CANVAS_HEIGHT, constants.CANVAS_WIDTH);
    canvas.height = constants.CANVAS_HEIGHT;
    canvas.width = constants.CANVAS_WIDTH;

    var tile = document.getElementById('tile'),
        mousex = document.getElementById('mousex'),
        mousey = document.getElementById('mousey'),
        fps = document.getElementById('fps');

});

function getCanvas(id) {
    //var scene = document.getElementById('scene');
    var ctx = scene.getContext('2d');

    return { scene, ctx };
}

export { getCanvas, canvas, ctx}