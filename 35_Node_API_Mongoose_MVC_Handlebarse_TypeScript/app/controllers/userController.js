const path = require('path');

exports.index = (req, res) => {
    res.render('user/index.hbs', {
        title: 'Список пользователей',
        isUser: true
    });
}