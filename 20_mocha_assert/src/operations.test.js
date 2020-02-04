const assert = require('assert');
const operations = require("./operations");
 
it("should multiply two numbers", function(){
    var expected = 15;
    var result = operations.multiply(3, 5);
    assert.equal(result, expected);
});

it("should add two numbers", function(){
    var expected = 16;
    var result = operations.add(9, 7);
    assert.equal(result, expected);
});

it("shoud async multiply two numbers", function(done){
    var expected = 12;
    operations.multiplyAsync(4, 3, function(result){
        assert.equal(result, expected);
        done();
    });
});