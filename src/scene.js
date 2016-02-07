var _offsetX = 0;
var _offsetY = 0;

const SCENE = {
    width: 1500,
    height: 1100,
    x: 0,
    y: 0,
    bottom: function() {
        return this.y + this.height;
    },
    right: function() {
        return this.x + this.width;
    },
    top: function() {
        return this.y;
    },
    left: function() {
        return this.x;
    },
    VIEW: {
        width: 900,
        height: 500,
        x: 0,
        y: 0,
        bottom: function() {
            return this.y + this.height;
        },
        right: function() {
            return this.x + this.width;
        },
        top: function() {
            return this.y;
        },
        left: function() {
            return this.x;
        }
    }

};

function offsetX(v) {
    if (v) {
        _offsetX += v;
        SCENE.VIEW.x += -v;
    } else {
        return _offsetX;
    }

}

function offsetY(v) {
    if (v) {
        _offsetY += v;
        SCENE.VIEW.y += -v;
    } else {
        return _offsetY;
    }

}
window.offsetX = offsetX;

export { SCENE, offsetX, offsetY }

/*
 * NOTE TO SELF:
 * When the player reaches < X tiles of edge of VIEW, offset the view in the axis
 * of movement by the inverse of player movement.
 *
 * e.g. player moves +10 towards right edge of view, offset += -10; This will
 * maintain player's relative distance to edge of view while advancing them with respect
 * to the other entities in the scene.
 *
 * Need to replace uses of CANVAS_[HEIGHT/WIDTH] with scene size contants. Canvas
 * constants will need to be used to calculate current view, not legal area of play.
 */