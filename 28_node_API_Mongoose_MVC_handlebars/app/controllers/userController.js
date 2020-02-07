const path = require('path');

module.exports.index = (req, res) => {
    res.render('user/index.hbs', {
        title: 'Список пользователей',
        isUser: true
    });
}