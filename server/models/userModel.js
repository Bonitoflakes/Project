import { mongoose } from 'mongoose';
import pkg from 'validator';
const { isEmail } = pkg;
import bcrypt from "bcrypt";

;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please enter a username"],
        unique: [true,"Username is already taken"],
        maxLength: [20, "Username cannot exceed 20 characters"],
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        unique: true,
        validate:[isEmail,"Please enter a valid email"]
    },
    password: {
        trim:true,
        type: String,
        required: true,
        minLength:8
    },
    
}
    // , {timeStamps: true, collection:"collection_name"}
);

// Mongoose Hooks
// userSchema.pre('save',async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

const User = mongoose.model("user", userSchema);



export { User };