const fs = require('fs');

const stream = new fs.ReadStream(__filename, {
    encoding: 'utf8'
});

// const stream = fs.createReadStream(__filename, {
//     encoding: 'utf8'
// });

stream.on('ready', () => {
    console.log('Ready');
    console.log('-----');
});

stream.on('open', () => {
    console.log('Open');
    console.log('-----');
});

stream.on('readable', () => {
    let data = stream.read();
    if(data)
        console.log(data, `\t\t\t\t\t\t\t(${data.length} - size)`);
});

stream.on('error', (err) => {
    if(err.code === 'ENOENT'){
        console.log('Файл не найден');
    } else {
        console.log(err);
    }
    
    console.log('-------');
    console.log('error');
});

stream.on('close', () => {
    console.log('-------');
    console.log('Close');
});