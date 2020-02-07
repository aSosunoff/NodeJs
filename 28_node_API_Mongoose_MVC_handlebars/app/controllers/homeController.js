const path = require('path');

module.exports.index = (req, res) => {
    res.render('home/index.hbs', {
        title: 'Главная страница',
        isHome: true
    });
}

module.exports.about = (req, res) => {
    res.render('home/about.hbs', {
        title: 'О сайте',
        isAbout: true
    });
}