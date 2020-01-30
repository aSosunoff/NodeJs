const fs = require('fs');

let fileName = 'hello.txt';

let writeableStream = fs.createWriteStream(fileName);
writeableStream.write('Привет');
writeableStream.write('Ещё строка\n');
writeableStream.end('Завершение');

let readableStream = fs.createReadStream(fileName, 'utf-8');
readableStream.on('data', chunk => {
    console.log(chunk);
});