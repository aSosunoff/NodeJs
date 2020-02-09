const http = require('http');
const fs = require('fs');
const url = require('url');

// setInterval(() => {
//     console.log(process.memoryUsage());
// }, 1000);

http.createServer((req, res) => {
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(`
        <ul>
        <li><a href="/1">1</a></li>
        <li><a href="/2">2</a></li>
        </ul>
        `);
        res.end();
        return;
    }

    if(req.url == '/1'){
        const stream = new fs.ReadStream('./index.html', {
            encoding: 'utf8'
        });

        stream.pipe(res);
        //stream.pipe(process.stdout);
        stream
            .on('error', (err) => {
                console.log(err);
                res.statusCode = 500;
                res.end('Сервер вернул ошибку');
            })
            .on('open', function(){
                console.log("open");
            })
            .on('close', function(){
                console.log("close");
            });

        res.on('close', () => {
            stream.destroy();
        });
        return;
    }

    if(req.url == '/2'){
        fs.readFile('./index_2.html', (err, data) => {
            if(err){
                res.statusCode = 404;
                res.end('Файл не найден');
                return;
            }

            res.setHeader('content-type', 'text/html; charset=utf-8');
            res.end(data);
        });
        return;
    }

    if(req.url == '/3'){
        const stream = new fs.ReadStream('./index.html', {
            encoding: 'utf8'
        });

        stream
            .on('readable', write)
            .on('open', () => {
                console.log('open');
            })
            .on('close', () => {
                console.log('close');
                res.end();
            })
            .on('error', err => {
                console.log(err);
                res.statusCode = 500;
                res.end('Сервер вернул ошибку');
            });

        res.on('close', () => {
            stream.destroy();
        })

        function write(){
            console.log('readable');
            let content = stream.read();
            if(content && !res.write(content)){
                stream.removeListener('readable', write);

                stream.once('drain', () => {
                    stream.on('readable', write);
                    write();
                });
            }
        }

        return;
    }
}).listen(3000, () => {
    console.log('Сервер готов отдавать файлы');
});