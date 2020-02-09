const fs = require('fs');
const mime = require('mime');
const path = require('path');

let ROOT = '';

module.exports = (pathRoot) => {
    ROOT = path.resolve(module.parent.path, `${pathRoot}`)
    return sendFileSafe;
}

const sendFileSafe = (filePath, callback) => {
    try {
        filePath = decodeURIComponent(filePath);
    } catch (error) {
        callback(errorCallback(400, 'Не верный запрос', error));
        return;
    }

    if(~filePath.indexOf('\0')){
        callback(errorCallback(400, 'Не верный запрос', null));
        return;
    }

    filePath = filePath.replace(/\/+$/,'')
    
    filePath = path.normalize(path.join(ROOT, filePath));
    
    if(filePath.indexOf(ROOT) != 0){
        callback(errorCallback(404, 'Файл не найден', null));
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if(err || !stats.isFile()){
            callback(errorCallback(404, 'Файл не найден', err));
            return;
        }

        sendFile(filePath, callback);

        fs.readFile(filePath, (err, data) => {
            if(err) {
                callback(errorCallback(404, 'Файл не найден', err));
                return;
            };
            callback(null, successCallback(data, mime.getType(filePath), path.parse(filePath).base));
        });
    });
}

const errorCallback = (code, message, error) => {
    return {
        message: message,
        code: code,
        error: error
    }
}

const successCallback = (content, contentType, fileName) => {
    return {
        content: content,
        contentType: contentType,
        fileNmae: fileNmae
    };
}