const http = require('http');
const fs = require('fs');
const path = require('path');
const chat = require('./chat');

http.createServer((req, res) => {
    let stream = null;
    switch(req.url){
        case '/': 
            stream = new fs.ReadStream(path.resolve(__dirname, 'index.html'), { encoding: 'utf8' });
            // res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            stream
                .on('error', (err) => {
                    res.statusCode = 500;
                    res.end('Server error');
                    console.log(err);
                })
                .pipe(res);
        break;
        case '/publish':
            let body = '';
            req
                .on('readable', () => {
                    let content = req.read();
                    if(content){
                        body += content;
                        if(body.length > 1e4){
                            res.statusCode = 413;
                            res.end('Выше сообщение слишком большое');
                        }
                    }
                })
                .on('end', () => {
                    try {
                        body = JSON.parse(body);
                    } catch (error) {
                        res.statusCode = 400;
                        res.end('Bad request');
                        return;
                    }
                    
                    chat.publish(body.message);
                    res.end('ok');
                });
        break;
        case '/subscribe': 
            chat.subscribe(req, res);
        break;
        case '/js.js': 
            stream = new fs.ReadStream(path.resolve(__dirname, 'js.js'), { encoding: 'utf8' });
            res.writeHead(200, {'Content-Type': 'text/javascript; charset=UTF-8'});
            stream.pipe(res);
        break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
}).listen(3000, () => {
    console.log('Чат готов');
});