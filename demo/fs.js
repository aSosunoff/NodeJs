const path = require('path');
const fs = require('fs');
const createPromise = require('./custom_modules/common_modules');

//https://solvit.io/53b9763
let newFolder = path.join(__dirname, 'fs_test');
let newFile = path.join(__dirname, 'fs_test', 'test.txt');

createPromise((resolve, reject) => {
    fs.exists(newFolder, exists => {
        resolve(exists);
    });
})
.then(exists => {
    return createPromise((resolve, reject) => {
        if(exists){
            fs.rmdir(newFolder, { recursive: true }, err => {
                if(err)
                    throw err;
            
                console.log('Папка удалена');
                console.log('\tНекоторое время надо подождать');
                
                setTimeout(resolve, 1000);
            });
        } else {
            resolve();
        }
    });
})
.then(() => {
    return createPromise((resolve, reject) => {
        fs.mkdir(newFolder, (err) => {
            if(err)
                throw err
        
            console.log('Папка создана');
            console.log('\tНекоторое время надо подождать');
    
            setTimeout(resolve, 1000); 
        });
    });
})
.then(() => {
    return createPromise((resolve, reject) => {
        fs.writeFile(newFile, 'Какая то информация', (err) => {
            if(err)
                throw err;
    
            console.log('Файл создан');
            console.log('\tНекоторое время надо подождать');
        
            setTimeout(resolve, 1000); 
        });
    });
})
.then(() => {
    return createPromise((resolve, reject) => {
        fs.appendFile(newFile, '\nЕщё информация', (err) => {
            if(err)
                throw err;
    
            console.log('В файл добавлена информация');
            console.log('\tНекоторое время надо подождать');
        
            setTimeout(resolve, 1000); 
        });
    });
})
.then(() => {
    fs.readFile(newFile, (err, buffer) => {
        if(err)
            throw err;
        let data = Buffer.from(buffer);
        console.log('---');
        console.log(data.toString());
    })
});

/*
if(fs.existsSync(newFolder)){
    fs.rmdir(newFolder, { recursive: true }, err => {
        if(err)
            throw err;
    
        console.log('Папка удалена');

        mkDirFolder(newFolder);
    });
} else {
    mkDirFolder(newFolder);
}
*/