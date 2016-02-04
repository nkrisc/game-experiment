var GameObject = require('../src/gameobject.js');

describe('isInBounds method of GameObject', function() {
    it('should return true for values in the canvas area', function() {
        expect(GameObject.isInBounds(100, 100)).toBe(true);
    })
});