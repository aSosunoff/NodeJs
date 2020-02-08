const winstonExtension = require('./winstonExtension')('module:add');

module.exports = (a, b) => {
    winstonExtension.debug('Отладочная информация');
    winstonExtension.info('Просто информация');
    winstonExtension.warn('Ошибка, но не критичная');
    winstonExtension.error('Критичная ошибка');
    return a + b;
}