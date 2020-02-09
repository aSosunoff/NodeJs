const path = require('path');

exports.index = (req, res) => {
    res.render('home/index.hbs', {
        title: 'Главная страница',
        isHome: true
    });
}

exports.about = (req, res) => {
    res.render('home/about.hbs', {
        title: 'О сайте',
        isAbout: true
    });
}