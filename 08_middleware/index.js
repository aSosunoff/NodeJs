const express = require('express');
const fs = require('fs');

const app = express();

app.use(function (req, res, next) {
    let date = new Date();
    
    const getNumber = number => {
        return `${number}`.padStart(2, '0');
    };

    let log = {
        date: `${getNumber(date.getDate())}.${getNumber(date.getMonth() + 1)}.${date.getFullYear()} ${getNumber(date.getHours())}:${getNumber(date.getMinutes())}:${getNumber(date.getSeconds())}`,
        url: req.url,
        agent: req.get('user-agent'),
    };

    fs.appendFile('log.txt', JSON.stringify(log) + '\n', () => {});

    next();
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000, () => {
    console.log('Server is started')
});