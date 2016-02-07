/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _terrain = __webpack_require__(1);

	var Terrain = _interopRequireWildcard(_terrain);

	var _entity = __webpack_require__(5);

	var _draw = __webpack_require__(6);

	var _update = __webpack_require__(11);

	var _constants = __webpack_require__(3);

	var constants = _interopRequireWildcard(_constants);

	var _input = __webpack_require__(7);

	var handler = _interopRequireWildcard(_input);

	__webpack_require__(9);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function init() {
	    //var tile = document.getElementById('tile');
	    //var mousex = document.getElementById('mousex');
	    //var mousey = document.getElementById('mousey');
	    //var f = document.getElementById('fps');
	    //var queue = [];

	    //var canvas = getCanvas('scene');
	    window.requestAnimationFrame(main);

	    function main() {
	        (0, _update.update)();
	        (0, _draw.draw)();
	        window.requestAnimationFrame(main);
	    }
	}

	var $game;
	document.addEventListener('DOMContentLoaded', init);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Decor = exports.Tile = undefined;

	var _gameobject = __webpack_require__(2);

	var _objectlist = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TILES = new _objectlist.ObjectList();
	var DECOR = new _objectlist.ObjectList();

	var Terrain = function (_GameObject) {
	    _inherits(Terrain, _GameObject);

	    function Terrain(x, y, type, update, list) {
	        _classCallCheck(this, Terrain);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Terrain).call(this, x, y, type, update));

	        _this.list = list;
	        return _this;
	    }

	    return Terrain;
	}(_gameobject.GameObject);

	var Tile = function (_Terrain) {
	    _inherits(Tile, _Terrain);

	    function Tile(x, y, type, update) {
	        _classCallCheck(this, Tile);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this, x, y, type, update, TILES));

	        _this2.destroy = function () {
	            TILES.remove(this.uuid);
	        };
	        TILES.add(_this2);
	        return _this2;
	    }

	    _createClass(Tile, null, [{
	        key: 'find',
	        value: function find(x, y) {
	            return TILES.find(x, y);
	        }
	    }, {
	        key: 'findByUUID',
	        value: function findByUUID(uuid) {
	            return TILES.get(uuid);
	        }
	    }, {
	        key: 'all',
	        value: function all() {
	            return TILES.all();
	        }
	    }, {
	        key: 'isLegalMove',
	        value: function isLegalMove(x, y) {
	            return Tile.isInBounds(x, y) && !Tile.find(x, y);
	        }
	    }]);

	    return Tile;
	}(Terrain);

	var Decor = function (_Terrain2) {
	    _inherits(Decor, _Terrain2);

	    function Decor(x, y, type, update) {
	        _classCallCheck(this, Decor);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Decor).call(this, x, y, type, update));

	        _this3.destroy = function () {
	            DECOR.remove(this.uuid);
	        };

	        DECOR.add(_this3);
	        return _this3;
	    }

	    _createClass(Decor, null, [{
	        key: 'find',
	        value: function find(x, y) {
	            DECOR.find(x, y);
	        }
	    }, {
	        key: 'findByUUID',
	        value: function findByUUID(uuid) {
	            return DECOR.get(uuid);
	        }
	    }, {
	        key: 'all',
	        value: function all() {
	            return DECOR.all();
	        }
	    }]);

	    return Decor;
	}(Terrain);

	window.tt = Tile.getTile;
	window.T = TILES;
	exports.Tile = Tile;
	exports.Decor = Decor;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameObject = undefined;

	var _constants = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameObject = function () {
	    function GameObject(x, y, type, update) {
	        _classCallCheck(this, GameObject);

	        this.type = type;
	        this.x = x;
	        this.y = y;
	        this.update = update;
	        this.uuid = GameObject.generateUUID();
	        this.isOffScreen = function () {
	            return !!(this.x > _constants.CANVAS_WIDTH || this.x < 0 || this.y > _constants.CANVAS_HEIGHT || this.y < 0);
	        };
	    }

	    _createClass(GameObject, null, [{
	        key: 'generateUUID',
	        value: function generateUUID() {
	            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	                var r = Math.random() * 16 | 0,
	                    v = c == 'x' ? r : r & 0x3 | 0x8;
	                return v.toString(16);
	            });
	        }
	    }, {
	        key: 'isInBounds',
	        value: function isInBounds(x, y) {
	            return x >= 0 && x < _constants.CANVAS_WIDTH && y >= 0 && y < _constants.CANVAS_HEIGHT;
	        }
	    }]);

	    return GameObject;
	}();

	exports.GameObject = GameObject;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by Nathan on 1/31/2016.
	 */

	var CANVAS_HEIGHT = 500;
	var CANVAS_WIDTH = 900;
	var queue = [];
	var TURN = 0;
	var TIME = 0;
	var LAST_TIME = 0;
	//var cursorPos = {};
	//var entities = [];

	exports.CANVAS_HEIGHT = CANVAS_HEIGHT;
	exports.CANVAS_WIDTH = CANVAS_WIDTH;
	exports.TURN = TURN;
	exports.TIME = TIME;
	exports.LAST_TIME = LAST_TIME;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ObjectList = function ObjectList() {
	    _classCallCheck(this, ObjectList);

	    var list = new Map();
	    this.add = function (object) {
	        var uuid = object.uuid;
	        list.set(uuid, object);
	        return list.get(uuid);
	    };
	    this.remove = function (uuid) {
	        list.delete(uuid);
	    };

	    this.all = function () {
	        return list.entries();
	    };

	    this.get = function (uuid) {
	        return list.get(uuid);
	    };

	    this.find = function (x, y) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = this.all()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _step$value = _slicedToArray(_step.value, 2);

	                var v = _step$value[1];

	                var current = v;
	                if (current.x === x && current.y === y) return current;
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        return false;
	    };
	};

	exports.ObjectList = ObjectList;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Entity = undefined;

	var _terrain = __webpack_require__(1);

	var _constants = __webpack_require__(3);

	var _objectlist = __webpack_require__(4);

	var _gameobject = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Nathan on 1/31/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	//TODO combine offscreen and legal move checks into one game area module

	var ENTITIES = new _objectlist.ObjectList();

	var Entity = function (_GameObject) {
	    _inherits(Entity, _GameObject);

	    function Entity(type, x, y, update, rest, state, dir) {
	        var _ret;

	        _classCallCheck(this, Entity);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Entity).call(this, x, y, type, update));

	        _this.rest = rest || 10;
	        _this.attackRest = rest || 10;
	        _this.state = state || 1;
	        _this.dir = dir || 0;
	        _this.wait = 0;
	        _this.attackWait = 0;
	        _this.uuid = _gameobject.GameObject.generateUUID();

	        _this.moveDown = function (steps) {
	            if (_terrain.Tile.isLegalMove(this.x, this.y + 10) && this.wait >= this.rest) {
	                this.wait = 0;
	                steps = steps || 1;
	                this.y += steps * 10;
	            }
	            this.dir = 0;
	        };

	        _this.moveRight = function (steps) {
	            if (_terrain.Tile.isLegalMove(this.x + 10, this.y) && this.wait >= this.rest) {
	                this.wait = 0;
	                steps = steps || 1;
	                this.x += steps * 10;
	            }
	            this.dir = 1;
	        };

	        _this.moveUp = function (steps) {
	            if (_terrain.Tile.isLegalMove(this.x, this.y - 10) && this.wait >= this.rest) {
	                this.wait = 0;
	                steps = steps || 1;
	                this.y -= steps * 10;
	            }
	            this.dir = 2;
	        };

	        _this.moveLeft = function (steps) {
	            if (_terrain.Tile.isLegalMove(this.x - 10, this.y) && this.wait >= this.rest) {
	                this.wait = 0;
	                steps = steps || 1;
	                this.x -= steps * 10;
	            }
	            this.dir = 3;
	        };

	        _this.isOffScreen = function () {
	            return !!(this.x > _constants.CANVAS_WIDTH || this.x < 0 || this.y > _constants.CANVAS_HEIGHT || this.y < 0);
	        };

	        _this.destroy = function () {
	            ENTITIES.remove(this.uuid);
	        };

	        return _ret = ENTITIES.add(_this), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Entity, null, [{
	        key: 'find',
	        value: function find(x, y) {
	            return ENTITIES.find(x, y);
	        }
	    }, {
	        key: 'findByUUID',
	        value: function findByUUID(uuid) {
	            return ENTITIES.get(uuid);
	        }
	    }, {
	        key: 'all',
	        value: function all() {
	            return ENTITIES.all();
	        }
	    }]);

	    return Entity;
	}(_gameobject.GameObject);

	window.E = ENTITIES;

	exports.Entity = Entity;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Created by Nathan on 1/31/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.draw = undefined;

	var _constants = __webpack_require__(3);

	var constants = _interopRequireWildcard(_constants);

	var _terrain = __webpack_require__(1);

	var _entity = __webpack_require__(5);

	var _input = __webpack_require__(7);

	var _UI = __webpack_require__(8);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	//IMAGES
	var root = 'assets/';
	//Player images
	var P = {};
	P.down = new Image(10, 10);
	P.down.src = root + 'p-down.png';

	P.right = new Image(10, 10);
	P.right.src = root + 'p-right.png';

	P.up = new Image(10, 10);
	P.up.src = root + 'p-up.png';

	P.left = new Image(10, 10);
	P.left.src = root + 'p-left.png';

	//Obstacle image
	var O = new Image(10, 10);
	O.src = root + 'obstacle.png';

	//Door image
	var D = new Image(10, 10);
	D.src = root + 'door.png';

	//Arrow images
	var A = {};
	A.down = new Image(10, 10);
	A.down.src = root + 'arrow-down.png';

	A.right = new Image(10, 10);
	A.right.src = root + 'arrow-right.png';

	A.up = new Image(10, 10);
	A.up.src = root + 'arrow-up.png';

	A.left = new Image(10, 10);
	A.left.src = root + 'arrow-left.png';

	//Terrain detail images
	var T = [];
	T[0] = new Image(10, 10);
	T[0].src = root + 'terrain-detail-1.png';
	T[1] = new Image(10, 10);
	T[1].src = root + 'terrain-detail-2.png';
	T[2] = new Image(10, 10);
	T[2].src = root + 'terrain-detail-3.png';
	T[3] = new Image(10, 10);
	T[3].src = root + 'terrain-detail-4.png';
	T[4] = new Image(10, 10);
	T[4].src = root + 'terrain-detail-5.png';

	function draw() {
	    _UI.ctx.fillStyle = '#000000';
	    _UI.ctx.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

	    //draw terrain details first
	    function drawDecor() {
	        var decor = _terrain.Decor.all();
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = decor[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _step$value = _slicedToArray(_step.value, 2);

	                var v = _step$value[1];

	                var current = v;
	                _UI.ctx.drawImage(T[4], current.x, current.y);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }
	    //then draw environment
	    function drawTiles() {
	        var tiles = _terrain.Tile.all();
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	            for (var _iterator2 = tiles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var _step2$value = _slicedToArray(_step2.value, 2);

	                var v = _step2$value[1];

	                var tile = v;
	                if (tile.type === 'door') {
	                    _UI.ctx.drawImage(D, tile.x, tile.y);
	                }
	                if (tile.type === 'obstacle') {
	                    _UI.ctx.drawImage(O, tile.x, tile.y);
	                }
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	    }

	    //Entities
	    function drawEntities() {
	        var entities = _entity.Entity.all();
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	            for (var _iterator3 = entities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var _step3$value = _slicedToArray(_step3.value, 2);

	                var v = _step3$value[1];

	                var ent = v;
	                if (ent.type === 'shot' && ent.state === 1) {
	                    _UI.ctx.fillStyle = '#ff0000';
	                    _UI.ctx.fillRect(ent.x + 2.5, ent.y + 2.5, 5, 5);
	                }
	                if (ent.type === 'arrow' && ent.state === 1) {
	                    if (ent.dir === 0) {
	                        _UI.ctx.drawImage(A.down, ent.x, ent.y);
	                    } else if (ent.dir === 1) {
	                        _UI.ctx.drawImage(A.right, ent.x, ent.y);
	                    } else if (ent.dir === 2) {
	                        _UI.ctx.drawImage(A.up, ent.x, ent.y);
	                    } else if (ent.dir === 3) {
	                        _UI.ctx.drawImage(A.left, ent.x, ent.y);
	                    }
	                }
	                if (ent.type === 'monster' && ent.state === 1) {
	                    _UI.ctx.fillStyle = '#00ffff';
	                    _UI.ctx.fillRect(ent.x, ent.y, 10, 10);
	                }
	                if (ent.type === 'player' && ent.state === 1) {
	                    if (ent.dir === 0) {
	                        _UI.ctx.drawImage(P.down, ent.x, ent.y);
	                    } else if (ent.dir === 1) {
	                        _UI.ctx.drawImage(P.right, ent.x, ent.y);
	                    } else if (ent.dir === 2) {
	                        _UI.ctx.drawImage(P.up, ent.x, ent.y);
	                    } else if (ent.dir === 3) {
	                        _UI.ctx.drawImage(P.left, ent.x, ent.y);
	                    }
	                }
	            }
	        } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                    _iterator3.return();
	                }
	            } finally {
	                if (_didIteratorError3) {
	                    throw _iteratorError3;
	                }
	            }
	        }
	    }

	    function drawCursor() {
	        _UI.ctx.strokeStyle = '#ffffff';

	        if (_input.CURSOR_STATE.drag === false) {
	            _UI.ctx.strokeRect(_input.CURSOR_STATE.x, _input.CURSOR_STATE.y, 10, 10);
	        } else {
	            var da = _input.CURSOR_STATE.dragArea;
	            _UI.ctx.strokeRect(da.x, da.y, da.width, da.height);
	        }
	    }

	    drawDecor();
	    drawTiles();
	    drawEntities();
	    drawCursor();
	}

	exports.draw = draw;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CURSOR_STATE = exports.KEY_STATE = exports.getCursorPos = undefined;

	var _UI = __webpack_require__(8);

	var _entity = __webpack_require__(5);

	var _units = __webpack_require__(9);

	var _action = __webpack_require__(10);

	var _terrain = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var KEY_STATE = {
	    arrows: new Set(),
	    ctrl: false,
	    shift: false,
	    alt: false,
	    j: false,
	    k: false
	};

	var CURSOR_STATE = {
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

	var GameEvent = function GameEvent(etity, event, value) {
	    _classCallCheck(this, GameEvent);

	    this.entity = entity;
	    this.event = event;
	    this.value = value;
	};

	function mouseDown(e) {
	    switch (e.button) {
	        case 0:
	            CURSOR_STATE.leftButtonDown = true;
	            break;
	        case 1:
	            CURSOR_STATE.rightButtonDown = true;
	    }
	}

	function mouseUp(e) {
	    switch (e.button) {
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
	    var x = e.pageX - _UI.canvas.offsetLeft;
	    var y = e.pageY - _UI.canvas.offsetTop;
	    x = Math.floor(x / 10) * 10;
	    y = Math.floor(y / 10) * 10;
	    return { x: x, y: y };
	}

	function canvasClick(e) {
	    e.preventDefault();
	    var m = mouseToGrid(e);
	    if (e.button === 0 && e.shiftKey === false && e.ctrlKey === false && e.altKey === false) {
	        new _terrain.Tile(m.x, m.y, 'obstacle');
	    } else if (e.button === 0 && e.shiftKey === true) {
	        new _terrain.Tile(m.x, m.y, 'door');
	    } else if (e.button === 2 && e.ctrlKey === false) {
	        _terrain.Tile.find(m.x, m.y).destroy();
	    } else if (e.button === 0 && e.altKey === true) {
	        new _terrain.Decor(m.x, m.y, 'floor');
	    } else if (e.button === 2 && e.ctrlKey === true) {
	        (0, _units.addRandomMonster)();
	    }
	}

	function inputKeyDown(e) {
	    e.preventDefault();

	    if (e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37) {
	        KEY_STATE.arrows.add(e.keyCode);
	    }

	    switch (e.keyCode) {
	        case 74:
	            KEY_STATE.j = true;
	            return;
	        case 75:
	            KEY_STATE.k = true;
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
	    return { x: CURSOR_STATE.x, y: CURSOR_STATE.y };
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
	    Math.abs(sx - cx) > Math.abs(sy - cy) ? dAxis = 2 : dAxis = 1;

	    //Find direction on axis
	    if (dAxis === 1) {
	        //If current Y value is smaller than start Y, cursor moved in negative Y direction
	        if (cy < sy) {
	            dAxis *= -1;
	        }
	        //If it's not smaller, leave dAxis as it was a move in the positive direction
	    } else {
	            if (cx < sx) {
	                dAxis *= -1;
	            }
	        }
	    return dAxis;
	}

	function onDrag() {
	    //Goes on mousemove. if mouse is still down leaves drag start tile, it is a drag
	    if (CURSOR_STATE.leftButtonDown === true && (CURSOR_STATE.x !== CURSOR_STATE.dragStartX || CURSOR_STATE.y !== CURSOR_STATE.dragStartY)) {
	        CURSOR_STATE.drag = true;
	    }
	    if (CURSOR_STATE.drag === true) {
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
	                console.log(cy);
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
	    CURSOR_STATE.drag = false;
	}

	window.addEventListener('DOMContentLoaded', function () {
	    _UI.canvas.oncontextmenu = function () {
	        return false;
	    };
	    _UI.canvas.addEventListener('mousedown', canvasClick);

	    window.addEventListener('mousedown', mouseDown);
	    _UI.canvas.addEventListener('mousedown', onDragStart);

	    window.addEventListener('mouseup', mouseUp);
	    _UI.canvas.addEventListener('mouseup', onDragRelease);

	    window.addEventListener('mousemove', mouseMove);
	    _UI.canvas.addEventListener('mousemove', onDrag);

	    window.addEventListener('keydown', inputKeyDown);
	    window.addEventListener('keyup', inputKeyUp);
	});

	window.C = CURSOR_STATE;
	exports.getCursorPos = getCursorPos;
	exports.KEY_STATE = KEY_STATE;
	exports.CURSOR_STATE = CURSOR_STATE;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ctx = exports.canvas = exports.getCanvas = undefined;

	var _constants = __webpack_require__(3);

	var constants = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var canvas, ctx;
	document.addEventListener('DOMContentLoaded', function () {
	    exports.canvas = canvas = document.getElementById('scene');
	    exports.ctx = ctx = canvas.getContext('2d');
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

	    return { scene: scene, ctx: ctx };
	}

	exports.getCanvas = getCanvas;
	exports.canvas = canvas;
	exports.ctx = ctx;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addRandomMonster = undefined;

	var _entity = __webpack_require__(5);

	function addRandomMonster() {
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
	            if (move === 0) self.moveDown();
	            if (move === 1) self.moveRight();
	            if (move === 2) self.moveUp();
	            if (move === 3) self.moveLeft();
	            self.wait = 0;
	        }
	    }
	    new _entity.Entity('monster', 100, 100, randoUpdate, 15, 1, 0);
	}

	addRandomMonster();

	exports.addRandomMonster = addRandomMonster;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Action = undefined;

	var _terrain = __webpack_require__(1);

	var _entity = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Action = function () {
	    function Action() {
	        _classCallCheck(this, Action);
	    }

	    _createClass(Action, null, [{
	        key: 'shoot',
	        value: function shoot(owner, dir) {
	            if (owner.attackWait < owner.attackRest) return;
	            owner.attackWait = 0;
	            var update = function update(self) {
	                var hit = _terrain.Tile.find(self.x, self.y);
	                if (hit) {
	                    hit.destroy();
	                    self.destroy();
	                }
	                if (self.isOffScreen()) {
	                    self.destroy();
	                } else if (self.dir === 0) {
	                    this.y += 10;
	                } else if (self.dir === 1) {
	                    this.x += 10;
	                } else if (self.dir === 2) {
	                    this.y -= 10;
	                } else if (self.dir === 3) {
	                    this.x -= 10;
	                }
	            };

	            new _entity.Entity('shot', owner.x, owner.y, update, null, 1, dir);
	        }
	    }, {
	        key: 'shootArrow',
	        value: function shootArrow(owner, dir) {
	            owner.wait = 0;
	            var startx = owner.x;
	            var starty = owner.y;
	            function update(self) {
	                var hit = _entity.Entity.find(self.x, self.y);
	                if (hit && hit.type !== 'player' && hit.uuid !== self.uuid) {
	                    hit.destroy();
	                    self.destroy();
	                } else if (_terrain.Tile.find(self.x, self.y)) {
	                    self.destroy();
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

	            new _entity.Entity('arrow', owner.x, owner.y, update, null, 1, dir);
	        }
	    }]);

	    return Action;
	}();

	exports.Action = Action;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.QUEUE = exports.update = undefined;

	var _entity = __webpack_require__(5);

	var _player = __webpack_require__(12);

	var _input = __webpack_require__(7);

	var _action = __webpack_require__(10);

	var QUEUE = [];

	function update() {
	    //1 sec updates
	    /*
	    time = Date.now() / 1000;
	    if(time - lastTime > 1 ) {
	        var fps = (turn / (time - lastTime)).toFixed(0);
	        UI.fps(fps); //implement
	        lastTime = time;
	        turn = 0;
	    }
	    */
	    //turn++;

	    function prune() {
	        var entities = _entity.Entity.all();
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var i = _step.value;

	                var ent = i[1];
	                if (ent.state === 0) {
	                    _entity.Entity.destroy(ent.uuid);
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }

	    function updateEntities() {
	        var entities = _entity.Entity.all();
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	            for (var _iterator2 = entities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var i = _step2.value;

	                var current = i[1];
	                current.update(current);
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	    }

	    //Process player movement event
	    //If there's a player action allow updates to advance one step
	    function updatePlayerBehavior() {
	        var player = (0, _player.getPlayer)();
	        switch (Array.from(_input.KEY_STATE.arrows.values()).pop()) {
	            case 40:
	                player.moveDown();
	                break;
	            case 39:
	                player.moveRight();
	                break;
	            case 38:
	                player.moveUp();
	                break;
	            case 37:
	                player.moveLeft();
	                break;
	        }
	        if (_input.KEY_STATE.j) {
	            _action.Action.shoot(player, player.dir);
	        }
	    }

	    updatePlayerBehavior();
	    updateEntities();
	    prune();
	}

	exports.update = update;
	exports.QUEUE = QUEUE;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getPlayer = undefined;

	var _entity = __webpack_require__(5);

	var _action = __webpack_require__(10);

	function playerUpdate(self) {
	    self.wait++;
	    self.attackWait++;
	}
	var player = new _entity.Entity('player', 10, 10, playerUpdate, 10, 1, 0);

	function getPlayer() {
	    return _entity.Entity.findByUUID(player.uuid);
	}

	exports.getPlayer = getPlayer;

/***/ }
/******/ ]);