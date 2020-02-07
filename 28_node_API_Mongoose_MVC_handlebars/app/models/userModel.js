const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "guest"
    },
    age: {
        type: Number,
        min: 18
    }
});

module.exports = mongoose.model("User", userSchema);