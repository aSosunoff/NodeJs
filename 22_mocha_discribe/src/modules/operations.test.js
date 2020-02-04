const assert = require('assert');
const operations = require('./operations');

describe('Operations Test', () => {
    it("should multiply two numbers", function(){
        var expected = 15;
        var result = operations.multiple(3, 5);
        assert.equal(result, expected);
    });
    
    it("should add two numbers", function(){
        var expected = 16;
        var result = operations.add(9, 7);
        assert.equal(result, expected);
    });
});