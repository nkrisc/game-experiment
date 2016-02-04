class ObjectList {
    constructor() {
        var list = new Map();
        this.add = function(object) {
            var uuid = object.uuid;
            list.set(uuid, object);
            return list.get(uuid);
        };
        this.remove = function(uuid) {
            list.delete(uuid)
        };

        this.all = function() {
            return list.entries();
        };

        this.get = function(uuid) {
            return list.get(uuid);
        }

        this.find = function (x, y) {
            for (var [, v] of this.all()) {
                let current = v;
                if (current.x === x && current.y === y) return current;
            }
            return false;
        }
    }
}

export { ObjectList }