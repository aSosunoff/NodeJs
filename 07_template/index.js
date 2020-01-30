const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    fs.readFile('index.html', 'utf-8', (err, data) => {
        if(err){
            res.statusCode = 404;
            res.end('Not found');
        } else {
            let template = data
                .replace("{message_1}", "Первое сообщение")
                .replace("{message_2}", "Второе сообщение");

            res.end(template);
        }
    });
}).listen(3000, () => {
    console.log('Server started');
});