const http = require('http');
const fs = require('fs');

http.createServer(function(req, res){
    const filePath = req.url.substr(1);
    console.log(filePath);

    fs.access(filePath, fs.constants.F_OK, err => {
        if(err){
            res.statusCode = 404;
            res.end('Not found');
        } else {
            fs.createReadStream(filePath).pipe(res);
        }
    });
}).listen(3000, () => {
    console.log('Server start');
});