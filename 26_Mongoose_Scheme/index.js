const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/26_Mongoose_Scheme", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "guest"
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    company: {
        name: String,
        employee: [String],
        date: Date
    }
});

const UserModel = mongoose.model("User", userSchema);

const user_1 = new UserModel({
    name: 'Bill',
    age: 18,
    company: {
        name: 'Company name',
        employee: ['Kir', 'Lin'],
        date: new Date()
    }
});

user_1.save()
    .then(doc => {
        console.log('Обьект сохранён', doc);
    })
    .catch(err => {
        console.log(err.message);
    })
    .finally(() => {
        mongoose.disconnect();
    });

const user_2 = new UserModel({
    age: 19,
    company: {
        name: 'Company name',
        employee: ['Kir', 'Lin'],
        date: new Date()
    }
});
    
user_2.save()
    .then(doc => {
        console.log('Обьект сохранён', doc);
    })
    .catch(err => {
        console.log(err.message);
    })
    .finally(() => {
        mongoose.disconnect();
    });