/**
 * Created by Nathan on 1/31/2016.
 */
import * as constants from './constants.js';
import { Tile, Decor } from './terrain.js';
import { Entity } from './entity.js';
import { MAINBAR, ctx } from './UI.js';
import { CURSOR_STATE } from './input.js';
import { offsetX, offsetY, SCENE } from './scene.js';
import { getPlayer } from './player.js';

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

//Menu Background
const M = new Image(10,10);
M.src = root + 'action-bar.png';

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
    ctx.fillRect(0, 0, SCENE.width, SCENE.height);

    //adjust offset based on player position
    var player = getPlayer();
    if (player.y >= SCENE.VIEW.bottom() - 70 && SCENE.bottom() !== SCENE.VIEW.bottom()) {
        offsetY(-10);
    }
    if (player.x >= SCENE.VIEW.right() - 50 && SCENE.right() !== SCENE.VIEW.right()) {
        offsetX(-10);
    }
    if (player.y <= SCENE.VIEW.top() + 50 && SCENE.top() !== SCENE.VIEW.top()) {
        offsetY(10);
    }
    if (player.x <= SCENE.VIEW.left() + 50 && SCENE.left() !== SCENE.VIEW.left()) {
        offsetX(10);
    }

    //draw terrain details first
    function drawDecor() {
        var  decor = Decor.all();
        for (var [, v] of decor) {
            let current = v;
            ctx.drawImage(T[4], current.x + offsetX(), current.y + offsetY())
        }
    }
    //then draw environment
    function drawTiles() {
        var tiles = Tile.all();
        for (var [, v] of tiles) {
            var tile = v;
            if (tile.type === 'door') {
                ctx.drawImage(D, tile.x + offsetX(), tile.y + offsetY());
            }
            if (tile.type === 'obstacle') {
                ctx.drawImage(O, tile.x + offsetX(), tile.y + offsetY());
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
                ctx.fillRect(ent.x + 2.5 + offsetX(), ent.y + 2.5 + offsetY(), 5, 5)
            }
            if (ent.type === 'arrow' && ent.state === 1) {
                if (ent.dir === 0) {
                    ctx.drawImage(A.down, ent.x + offsetX(), ent.y + offsetY());
                } else if (ent.dir === 1) {
                    ctx.drawImage(A.right, ent.x + offsetX(), ent.y + offsetY());
                } else if (ent.dir === 2) {
                    ctx.drawImage(A.up, ent.x + offsetX(), ent.y + offsetY());
                } else if (ent.dir === 3) {
                    ctx.drawImage(A.left, ent.x + offsetX(), ent.y + offsetY());
                }
            }
            if (ent.type === 'monster' && ent.state === 1) {
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(ent.x + offsetX(), ent.y + offsetY(), 10, 10);
            }
            if (ent.type === 'player' && ent.state === 1) {
                if (ent.dir === 0) {
                    ctx.drawImage(P.down, ent.x + offsetX(), ent.y + offsetY());
                } else if (ent.dir === 1) {
                    ctx.drawImage(P.right, ent.x + offsetX(), ent.y + offsetY());
                } else if (ent.dir === 2) {
                    ctx.drawImage(P.up, ent.x + offsetX(), ent.y + offsetY());
                } else if (ent.dir === 3) {
                    ctx.drawImage(P.left, ent.x + offsetX(), ent.y + offsetY());
                }
            }
        }
    }

    function drawCursor() {
        ctx.strokeStyle = '#ffffff';

        if (CURSOR_STATE.drag === false) {
            ctx.strokeRect(CURSOR_STATE.x, CURSOR_STATE.y, 10, 10)
        } else {
            var da = CURSOR_STATE.dragArea;
            ctx.strokeRect(da.x, da.y, da.width, da.height)
        }
    }

    function drawMenu() {
        var buttonSpacing = 10,
            barWidth = MAINBAR.size() * 30 + MAINBAR.size() * buttonSpacing,
            barX = SCENE.VIEW.width / 2 - barWidth / 2,
            ix = barX,
            barY = SCENE.VIEW.height - 40;

        ctx.drawImage(M, 0, SCENE.VIEW.height - 50);

        for (var i = 0; i < MAINBAR.size(); i++) {
            if (MAINBAR.buttons[i].icon) {
                ctx.drawImage(MAINBAR.buttons[i].icon, ix, barY);
            } else {
                //default shape
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(ix, barY, 30, 30);
            }
            ctx.fillStyle = '#ffffff';
            ctx.font = '11 Courier New';
            ctx.fillText(i + 1, ix + 2, SCENE.VIEW.height - 30);
            ix += 30 + buttonSpacing;
        }

        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(barX + MAINBAR.selected * 30 + MAINBAR.selected * buttonSpacing, barY, 30, 30)
    }

    drawDecor();
    drawTiles();
    drawEntities();
    drawCursor();
    drawMenu();
}
export { draw }