import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength:20
    },
    password: {
        type: String,
        required: true,
        minLength:8
        
    },
});
const User = mongoose.model("user", userSchema);

export { User };