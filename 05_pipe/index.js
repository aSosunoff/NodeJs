const fs = require('fs');
const zlib = require('zlib');

let readableStream = fs.createReadStream('hello_from.txt', 'utf-8');
let writeableStream = fs.createWriteStream('hello_to.txt');

// 1 way
// readableStream.on('data', chunk => {
//     writeableStream.write(chunk);
// });

// 2 way
readableStream.pipe(writeableStream);

// text file to GZ
let writeableStreamGZ = fs.createWriteStream('hello_to.txt.gz');
let gzip = zlib.createGzip();
readableStream.pipe(gzip).pipe(writeableStreamGZ);
