function init() {
    var canvas = document.getElementById('scene');
    var tile = document.getElementById('tile');
    var mousex = document.getElementById('mousex');
    var mousey = document.getElementById('mousey');
    var CANVAS_HEIGHT = 500;
    var CANVAS_WIDTH = 900;
    var ctx = canvas.getContext('2d');
    var queue = [];
    var turn = 0;
    var time= 0;
    var lastTime = 0;
    var f = document.getElementById('fps');
    var cursorPos = {};
    var entities = [];

    /**
 * Created by Nathan on 1/31/2016.
 */

function playerUpdate(self) {
    self.wait++
}

var player = new Entity('player', 10, 10, playerUpdate, 10, 1, 0);

function randoUpdate(self) {
    self.wait++;
    var lastDir = self.dir;
    if (self.wait >= self.rest) {
        var move;
        if (Math.random() > 0.35) {
            move = lastDir;
        } else {
            move = Math.floor(Math.random() * 4);
        }
        if (move === 0 && this.y + 10 < CANVAS_HEIGHT) self.moveDown();
        if (move === 1 && this.x + 10 < CANVAS_WIDTH) self.moveRight();
        if (move === 2 && this.y - 10 >= 0) self.moveUp();
        if (move === 3 && this.x - 10 >= 0) self.moveLeft();
        self.wait = 0;
    }
}
var randoEnemy = new Entity('monster', 100, 100, randoUpdate, 15, 1, 0);

entities.push(randoEnemy);
entities.push(player);
    /**
 * Created by Nathan on 1/31/2016.
 */

function Terrain() {
    var _this = this;
    this.obstacles = [];
    this.misc = [];
    this.nullTile = {x: null, y: null, type: null};

    //Checks for collision by an entity at a supplied x,y. Returns true if collision occurs, else false.
    this.collision = function(x, y, entity) {
        var col = false;
        for (var i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x === x && this.obstacles[i].y === y) {
                if (this.obstacles[i].type === 'obstacle') col = true;
                col = !(this.obstacles[i].type === 'door' && entity.type === 'player');
            }
        }
        return col;
    }

    //Create a new tile at the supplied x,y and of the supplied type.
    this.new = function (x, y, type) {
        var exists = false;
        if (type === 'obstacle' || type === 'door') {
            for (var i in _this.obstacles) {
                if (_this.obstacles[i].x === x && _this.obstacles[i].y === y) {
                    exists = true;
                }
            }
            if (!exists) _this.obstacles.push({x: x, y: y, type: type});
        } else if (type === 'floor') {
            for (var i in this.misc) {
                if (this.misc[i].x === x && this.misc[i].y === y) {
                    exists = true;
                }
            }
            if (!exists) this.misc.push({x: x, y: y, type: 'floor', image: 4});
        }
        return !exists;
    }

    //Removes a tile at the supplied x,y.
    this.remove = function(x, y) {
        for (var i in _this.obstacles) {
            if (_this.obstacles[i].x === x && _this.obstacles[i].y === y) {
                _this.obstacles.splice(i,1);
            }
        }
    };

    //Return the tile at the supplied x,y. Returns null tile if none.
    this.getTile = function (x, y) {
        for (i = 0; i < _this.obstacles.length; i++) {
            var _tile = _this.obstacles[i];
            if (_tile.x === x && _tile.y === y) {
                return _tile;
            }
        }
        return null;
    };

    this.exportObstacles = function () {
        return _this.obstacles;
    };

    //Seed some random obstacles. To be replaced by a generator in the future.
    for (var i = 0; i < 20; i++) {
        var ox = Math.floor(Math.random() * CANVAS_WIDTH / 10) * 10;
        var oy = Math.floor(Math.random() * CANVAS_HEIGHT / 10) * 10;
        if (ox !== 10 && oy !== 10) _this.new(ox, oy, 'obstacle'); //OB CHANGE
    }

    //create some random terrain detail
    for (var i = 0; i < 50; i++) {
        var ox = Math.floor(Math.random() * CANVAS_WIDTH / 10) * 10;
        var oy = Math.floor(Math.random() * CANVAS_HEIGHT / 10) * 10;
        this.misc.push({x: ox, y: oy, image: Math.floor(Math.random() * 4)});
    }

    window.exportObstacles = this.exportObstacles;
}
    /**
 * Created by Nathan on 1/31/2016.
 */

function Entity(type, x, y, update, rest, state, dir) {
    this.type = type;
    if(typeof x === 'number') this.x = Math.floor(x);
    if(typeof x === 'number') this.y = Math.floor(y);
    this.update = update;
    this.state = state || 1;
    this.wait = 0;
    this.dir = dir || 0;
    this.rest = rest || 10;

    this.isOffScreen = function() {
        return !!(this.x > CANVAS_WIDTH || this.x < 0 || this.y > CANVAS_HEIGHT || this.y < 0);
    };

    this.moveDown = function(steps) {
        if (!terrain.collision(this.x, this.y + 10, this) && this.y + 10 < CANVAS_HEIGHT) {
            steps = steps || 1;
            this.y += steps * 10;
        }
        this.dir = 0;
    };

    this.moveRight = function(steps) {
        if (!terrain.collision(this.x + 10, this.y, this) && this.x + 10 < CANVAS_WIDTH) {
            steps = steps || 1;
            this.x += steps * 10;
        }
        this.dir = 1;
    };

    this.moveUp = function(steps) {
        if (!terrain.collision(this.x, this.y - 10, this) && this.y - 10 >= 0) {
            steps = steps || 1;
            this.y -= steps * 10;
        }
        this.dir = 2;
    };

    this.moveLeft = function(steps) {
        if (!terrain.collision(this.x - 10, this.y, this) && this.x - 10 >= 0) {
            steps = steps || 1;
            this.x -= steps * 10;
        }
        this.dir = 3;
    }
}
Entity.find = function(x, y) {
    for (e in entities) {
        var current = entities[e];
        if (current.x === x && current.y === y) {
            return current;
        }
    }
}
    /**
 * Created by Nathan on 1/31/2016.
 */

function Action() {
    this.shoot = function(owner, dir) {
        owner.wait = 0;
        var update = function(self) {
            var hit = terrain.getTile(this.x, this.y);
            if (hit) {
                terrain.remove(this.x, this.y);
                this.state = 0;
            }
            //TODO: in future entity hit checking, check against owner so no self hit
            if (self.isOffScreen()) {
                self.state = 0;
            }  else if (self.dir === 0) {
                this.y += 10;
            } else if (self.dir === 1) {
                this.x += 10;
            } else if (self.dir === 2) {
                this.y -= 10;
            } else if (self.dir === 3) {
                this.x -= 10;
            }
        };

        var shot = new Entity('shot', owner.x, owner.y, update, null, 1, dir);
        entities.push(shot);
        return shot;
    };

    this.shootArrow = function(owner, dir) {
        owner.wait = 0;
        function update(self) {
            var hit = Entity.find(self.x, self.y);
            if (hit && hit.type !== 'player' && hit !== self) {
                console.log(hit)
                hit.state = 0;
                self.state = 0;
            } else if (terrain.getTile(self.x, self.y)) {
                self.state = 0;
            } else if (self.dir === 0) {
                this.y += 10;
            } else if (self.dir === 1) {
                this.x += 10;
            } else if (self.dir === 2) {
                this.y -= 10;
            } else if (self.dir === 3) {
                this.x -= 10;
            }
        }

        var arrow = new Entity('arrow', owner.x, owner.y, update, null, 1, dir);
        entities.push(arrow);
        return arrow;
    }
}
    /**
 * Created by Nathan on 1/31/2016.
 */

function GameEvent(entity, event, value) {
    return {
        entity: entity,
        event: event,
        value: value
    }
}

function handleMouseMove(e) {
    var m = mouseToGrid(e);
    cursorPos.x = m.x;
    cursorPos.y = m.y;

    mousex.textContent = m.x;
    mousey.textContent = m.y;

    var T = terrain.getTile(m.x, m.y);
    tile.textContent = T ? terrain.getTile(m.x, m.y).type : '';
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
        terrain.new(m.x, m.y, 'obstacle');
    } else if (e.button === 0 && e.shiftKey === true) {
        terrain.new(m.x, m.y, 'door');
    } else if (e.button === 2 && e.ctrlKey === false) {
        terrain.remove(m.x, m.y);
    } else if (e.button === 0 && e.ctrlKey === true) {
        randoEnemy.x = m.x;
        randoEnemy.y = m.y;
    } else if (e.button === 0 && e.altKey === true) {
        console.log('floor');
        terrain.new(m.x, m.y, 'floor');
    } else if (e.button === 2 && e.ctrlKey === true) {
        entities.push(new Entity('monster', m.x, m.y, function (self) {
            self.wait++;
            var lastDir = self.dir;
            if (self.wait >= self.rest) {
                var move;
                if (Math.random() > 0.35) {
                    move = lastDir;
                } else {
                    move = Math.floor(Math.random() * 4);
                }
                if (move === 0 && this.y + 10 < CANVAS_HEIGHT) self.moveDown();
                if (move === 1 && this.x + 10 < CANVAS_WIDTH) self.moveRight();
                if (move === 2 && this.y - 10 >= 0) self.moveUp();
                if (move === 3 && this.x - 10 >= 0) self.moveLeft();
                self.wait = 0;
            }
        }, 15, 1, 0))
    }
}

function keyHandler(e) {
    e.preventDefault();
    if (e.keyCode === 40) {
        queue.push(new GameEvent(player, 'move', 'down'));
    } else if (e.keyCode === 39) {
        queue.push(new GameEvent(player, 'move', 'right'));
    } else if (e.keyCode === 38) {
        queue.push(new GameEvent(player, 'move', 'up'));
    } else if (e.keyCode === 37) {
        queue.push(new GameEvent(player, 'move', 'left'));
    } else if (e.keyCode === 74) {
        console.log('J', player.wait, player.rest);
        if (player.wait >= player.rest) queue.push(new GameEvent(action.shoot(player, player.dir), 'action', null)); //hardcoded to player
    } else if (e.keyCode === 75) {
        if (player.wait >= player.rest) queue.push(new GameEvent(action.shootArrow(player, player.dir), 'action', null));
    }
}


    /**
 * Created by Nathan on 1/31/2016.
 */

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
    turn++;

    //prune expired entities
    for (var i in entities) {
        if(entities[i].state === 0) {
            entities.splice(i,1);
        }
    }


    //Update separately from event queue. All updates will be processed each
    //cycle regardless of event queue.
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].state !== 0) {
            entities[i].update(entities[i])
        }
    }

    if (queue.length === 0) return;
    var current = queue.shift();
    //if(current)console.log(current.event, current.entity, Date.now() /1000)

    //Process player movement event
    if (current) {
        if (current.event === 'move') {
            if (current.value === 'down') {
                current.entity.moveDown();
            } else if (current.value === 'right') {
                current.entity.moveRight();
            } else if (current.value === 'up') {
                current.entity.moveUp();
            } else if (current.value === 'left') {
                current.entity.moveLeft();
            }
        }

    }

    /*if (current.event === 'action') {
     current.entity.update(current);
     console.log('action');
     }*/
}
    /**
 * Created by Nathan on 1/31/2016.
 */

//IMAGES
var root = 'assets/';
var P = {};
P.down = new Image(10,10);
P.down.src = root + 'p-down.png';

P.right = new Image(10,10);
P.right.src = root + 'p-right.png';

P.up = new Image(10,10);
P.up.src = root + 'p-up.png';

P.left = new Image(10,10);
P.left.src = root + 'p-left.png';

var O = new Image(10,10);
O.src = root + 'obstacle.png';

var D = new Image(10,10);
D.src = root + 'door.png';

var A = {};
A.down = new Image(10,10);
A.down.src = root + 'arrow-down.png';

A.right = new Image(10,10);
A.right.src = root + 'arrow-right.png';

A.up = new Image(10,10);
A.up.src = root + 'arrow-up.png';

A.left = new Image(10,10);
A.left.src = root + 'arrow-left.png';

var T = [];
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
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //draw terrain details first
    for (var i = 0; i < terrain.misc.length; i++) {
        ctx.drawImage(T[terrain.misc[i].image], terrain.misc[i].x, terrain.misc[i].y)
    }
    //then draw environment
    for (var i = 0; i < terrain.obstacles.length; i++) {
        if (terrain.obstacles[i].type === 'door') {
            ctx.drawImage(D, terrain.obstacles[i].x, terrain.obstacles[i].y);
        }
        if (terrain.obstacles[i].type === 'obstacle') {
            ctx.drawImage(O, terrain.obstacles[i].x, terrain.obstacles[i].y);
        }
    }

    //Entities
    for (var i = 0; i < entities.length; i++) {
        var ent = entities[i];
        if (ent.type === 'shot' && ent.state === 1) {
            ctx.fillStyle ='#ff0000';
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
        if (ent.type === 'monster' && ent.state ===1) {
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(ent.x, ent.y, 10, 10);
        }
    }

    //Draw random moving enemy


    //Draw Player
    ctx.fillStyle = '#ff0000';
    if (player.dir === 0) {
        ctx.drawImage(P.down, player.x, player.y);
    } else if (player.dir === 1) {
        ctx.drawImage(P.right, player.x, player.y);
    } else if (player.dir === 2) {
        ctx.drawImage(P.up, player.x, player.y);
    } else if (player.dir === 3) {
        ctx.drawImage(P.left, player.x, player.y);
    }

    if (typeof cursorPos.x !== 'undefined' && typeof cursorPos.y !== 'undefined') {
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(cursorPos.x, cursorPos.y, 10, 10)
    }
}

    terrain = new Terrain();
    action = new Action();

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;

    canvas.oncontextmenu = function(){return false};
    canvas.addEventListener('mousedown', canvasClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', keyHandler)
    window.requestAnimationFrame(main);

    function main() {
        update(entities);
        draw(ctx, entities);
        window.requestAnimationFrame(main);
    }
}

var $game;
document.addEventListener('DOMContentLoaded', init);