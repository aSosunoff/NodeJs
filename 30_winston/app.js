const winstonExtension = require('./module/winstonExtension')('module:main');
const add = require('./module/additionModule');
const sub = require('./module/subtractionModule');

const mainFunc = (a, b, c) => {
    winstonExtension.debug('Отладочная информация');
    winstonExtension.info('Просто информация');
    winstonExtension.warn('Ошибка, но не критичная');
    winstonExtension.error('Критичная ошибка');
    let res_1 = add(a, b);
    let res_2 = sub(res_1, c);
    return res_2;
};

console.log(mainFunc(2, 2, 3));