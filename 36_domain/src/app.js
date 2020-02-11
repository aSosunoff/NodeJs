const domain = require('domain');
const serverDomain = domain.create();
let server;

serverDomain.run(() => {
    const http = require('http');
    const handler = require('./handler');

    server = http
        .createServer((req, res) => {
            const reqDomain = domain.create();
            reqDomain.add(req);
            reqDomain.add(res);

            reqDomain.on('error', err => {
                res.statusCode = 500;
                res.setHeader('content-type', 'text/html; charset=utf-8');
                res.end(`Ошибка ${err}`);
                serverDomain.emit('error', err);
                console.log('Внутренний домен перехватил ошибку');
            });

            reqDomain.run(() => {
                handler(req, res);
            });
        })
        .listen(3000, () => {
            console.log('Server is started');
        });

    // setTimeout(() => {
    //     ERROR(); // функции не существует
    // }, 1000);
});

serverDomain.on('error', (err) => {
    console.error('Домен перехватил', err);

    if(server) 
        server.close();

    setTimeout(() => {
        process.exit(1);
    }).unref();
});