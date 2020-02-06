
module.exports = function getPromise(callback){
    return new Promise((resolve, reject) => {
        if(typeof callback != "function")
            resolve();
        else
            callback(resolve, reject);
    });
};