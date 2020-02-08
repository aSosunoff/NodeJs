const winston = require('winston');

module.exports = (a, b) => {
    // winston.error('Критичная ошибка');
    // winston.info('Просто информация');
    // winston.warn('Ошибка, но не критичная');
    // winston.debug('Отладочная информация');
    return a - b;
}