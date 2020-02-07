const path = require('path');

module.exports.index = (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.resolve(__dirname, '../views/home/index.html'));
}

module.exports.about = (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.resolve(__dirname, '../views/home/about.html'));
}