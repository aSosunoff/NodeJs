const fs = require('fs');
const mime = require('mime');
const path = require('path');

let ROOT = '';

// module.exports = (...pathRoot) => {
//     for(let i = 0; i < pathRoot.length; i++)
//         ROOT.push(path.resolve(__dirname, `../${pathRoot[i]}`));

//     return sendFileSafe;
// }

module.exports = (pathRoot) => {
    ROOT = path.resolve(__dirname, `../${pathRoot}`)
    return sendFileSafe;
}

const sendFileSafe = (filePath, callback) => {
    try {
        filePath = decodeURIComponent(filePath);
    } catch (error) {
        callback({
            message: 'Не верный запрос',
            code: 400,
            error: error
        });
        return;
    }

    if(~filePath.indexOf('\0')){
        callback({
            message: 'Не верный запрос',
            code: 400,
            error: null
        });
        return;
    }

    filePath = filePath.replace(/\/+$/,'')
    
    filePath = path.normalize(path.join(ROOT, filePath));
    
    if(filePath.indexOf(ROOT) != 0){
        callback({
            message: 'Файл не найден',
            code: 404,
            error: null
        });
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if(err || !stats.isFile()){
            callback({
                message: 'Файл не найден',
                code: 404,
                error: err
            });
            return;
        }

        sendFile(filePath, callback);
    });
}

const sendFile = (filePath, callback) => {
    fs.readFile(filePath, (err, data) => {
        if(err) {
            callback({
                message: 'Файл не найден',
                code: 404,
                error: err
            });
            return;
        };
        callback(null, {
            content: data,
            contentType: mime.getType(filePath)
        });
    });
}