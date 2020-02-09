import mongoose from 'mongoose';

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

export default mongoose.model("User", userSchema);