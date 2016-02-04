/**
 * Created by Nathan on 1/31/2016.
 */
import * as constants from './constants.js';
import { Tile, Decor } from './terrain.js';
import { Entity } from './entity.js';
import { getCursorPos } from './input.js';
import { ctx } from './UI.js';

//IMAGES
const root = 'assets/';
//Player images
const P = {};
P.down = new Image(10,10);
P.down.src = root + 'p-down.png';

P.right = new Image(10,10);
P.right.src = root + 'p-right.png';

P.up = new Image(10,10);
P.up.src = root + 'p-up.png';

P.left = new Image(10,10);
P.left.src = root + 'p-left.png';

//Obstacle image
const O = new Image(10,10);
O.src = root + 'obstacle.png';

//Door image
const D = new Image(10,10);
D.src = root + 'door.png';

//Arrow images
const A = {};
A.down = new Image(10,10);
A.down.src = root + 'arrow-down.png';

A.right = new Image(10,10);
A.right.src = root + 'arrow-right.png';

A.up = new Image(10,10);
A.up.src = root + 'arrow-up.png';

A.left = new Image(10,10);
A.left.src = root + 'arrow-left.png';

//Terrain detail images
const T = [];
T[0] = new Image(10,10);
T[0].src = root + 'terrain-detail-1.png';
T[1] = new Image(10,10);
T[1].src = root + 'terrain-detail-2.png';
T[2] = new Image(10,10);
T[2].src = root + 'terrain-detail-3.png';
T[3] = new Image(10,10);
T[3].src = root + 'terrain-detail-4.png';
T[4] = new Image(10,10);
T[4].src = root + 'terrain-detail-5.png';

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

    //draw terrain details first
    function drawDecor() {
        var  decor = Decor.all();
        for (var [, v] of decor) {
            let current = v;
            ctx.drawImage(T[4], current.x, current.y)
        }
    }
    //then draw environment
    function drawTiles() {
        var tiles = Tile.all();
        for (var [, v] of tiles) {
            var tile = v;
            if (tile.type === 'door') {
                ctx.drawImage(D, tile.x, tile.y);
            }
            if (tile.type === 'obstacle') {
                ctx.drawImage(O, tile.x, tile.y);
            }
        }
    }

    //Entities
    function drawEntities() {
        var entities = Entity.all();
        for (var [, v] of entities) {
            var ent = v;
            if (ent.type === 'shot' && ent.state === 1) {
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(ent.x + 2.5, ent.y + 2.5, 5, 5)
            }
            if (ent.type === 'arrow' && ent.state === 1) {
                if (ent.dir === 0) {
                    ctx.drawImage(A.down, ent.x, ent.y);
                } else if (ent.dir === 1) {
                    ctx.drawImage(A.right, ent.x, ent.y);
                } else if (ent.dir === 2) {
                    ctx.drawImage(A.up, ent.x, ent.y);
                } else if (ent.dir === 3) {
                    ctx.drawImage(A.left, ent.x, ent.y);
                }
            }
            if (ent.type === 'monster' && ent.state === 1) {
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(ent.x, ent.y, 10, 10);
            }
            if (ent.type === 'player' && ent.state === 1) {
                if (ent.dir === 0) {
                    ctx.drawImage(P.down, ent.x, ent.y);
                } else if (ent.dir === 1) {
                    ctx.drawImage(P.right, ent.x, ent.y);
                } else if (ent.dir === 2) {
                    ctx.drawImage(P.up, ent.x, ent.y);
                } else if (ent.dir === 3) {
                    ctx.drawImage(P.left, ent.x, ent.y);
                }
            }
        }
    }

    function drawCursor(cursorPos) {
        if (cursorPos.x && cursorPos.y) {
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(cursorPos.x, cursorPos.y, 10, 10)
        }
    }

    drawDecor();
    drawTiles();
    drawEntities();
    drawCursor(getCursorPos());


}

export { draw }