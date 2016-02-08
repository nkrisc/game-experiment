import * as constants from './constants.js';
var canvas, ctx;
//Look to deprecate
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

class UIButton {
    constructor(name, icon, select) {
        icon instanceof HTMLImageElement ? this.icon = icon : this.icon = null;
        typeof name === 'string' ? this.name = name : this.name = null;
        typeof select === 'function' ? this.select = select : this.select = null;
    }
}

class  ToolBar {
    constructor(name, buttonArray) {
        typeof name === 'string' ? this.name = name : this.name = null;
        buttonArray instanceof Array ? this.buttons = buttonArray : this.buttons = [];
        this.selected = 0;
        this.select = function(index) {
            this.selected = index;
            if (this.buttons[index].select) this.buttons[index].select();
            return this.buttons[index];
        };
        this.size = function() {
            return this.buttons.length;
        }
    }
}

var mainButtons = [
    new UIButton('obstacle', null, null),
    new UIButton('door', null, null),
    new UIButton('floor', null, null)
];
const MAINBAR = new ToolBar('main', mainButtons);

function getCanvas(id) {
    //var scene = document.getElementById('scene');
    var ctx = scene.getContext('2d');

    return { scene, ctx };
}

export { getCanvas, canvas, ctx}