const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/25_Mongoose", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});



const UserModel = mongoose.model("User", userSchema);
const user = new UserModel({
    name: 'Bill',
    age: 15
});

/*
user.save((err, doc) => {
    mongoose.disconnect();

    if(err) return console.log(err);

    console.log('Обьект сохранён', user, doc);
});
*/

user.save()
    .then(doc => {
        console.log('Обьект сохранён', user, doc);
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        mongoose.disconnect();
    });