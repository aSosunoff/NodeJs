const debug = require('debug')('module:add');

module.exports = (a, b) => {
    debug('Произошло сложение');
    return a + b;
}