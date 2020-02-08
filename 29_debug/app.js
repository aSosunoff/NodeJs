const debug = require('debug')('module:main');
const add = require('./module/additionModule');
const sub = require('./module/subtractionModule');

const mainFunc = (a, b, c) => {
    debug('Сработала главная функция');
    let res_1 = add(a, b);
    let res_2 = sub(res_1, c);
    return res_2;
};

console.log(mainFunc(2, 2, 3));