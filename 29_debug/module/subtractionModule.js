const debug = require('debug')('module:sub');

module.exports = (a, b) => {
    debug('Произошло вычитание');
    return a - b;
}