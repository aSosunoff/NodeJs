const http = require('http');
const url = require('url');

const sendFileSafe = require('./module/sendFileSafe')('public');

http.createServer((req, res) => {
    res.setHeader('content-type', 'text/plain; charset=utf-8');

    if(!checkAccess(req)){
        res.statusCode = 403;
        res.end('У вас нет прав доступа');
        return;
    }
    
    sendFileSafe(url.parse(req.url, true).pathname, (err, data) => {
        if(err){
            res.statusCode = err.code;
            res.end(err.message);
            console.log(err.error);
            return;
        }
        res.setHeader('Content-Type', `${data.contentType}; charset=utf-8`);
        res.end(data.content);
    });
}).listen(3000, () => {
    console.log('Сервер готов отдавать файлы');
});

const checkAccess = req => {
    return url.parse(req.url, true).query.secret === 'qwerty';
}