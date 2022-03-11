import { mongoose } from 'mongoose';
import pkg from 'validator';
const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please enter a username"],
        unique: [true,"Username is already taken"],
        maxLength:[20,"Username cannot exceed 20 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:[isEmail,"Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength:8
        
    },
});
const User = mongoose.model("user", userSchema);

export { User };