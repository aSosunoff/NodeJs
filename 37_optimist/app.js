const http = require('http');
const optimist = require('optimist');

let port = optimist.argv.port || process.env.MY_PORT || 3000;

http
    .createServer((req, res) => {

    })
    .listen(port, () => {
        console.log(`Сервер запущен на порту ${optimist.argv.port}`);
        console.log(process.argv);
        console.log(optimist.argv);
        console.log(process.env.MY_PORT);
    });