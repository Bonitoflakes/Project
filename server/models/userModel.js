import { mongoose } from "mongoose";
import validator from "validator";
const { isEmail } = validator;
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [true, "Username is already taken"],
      maxLength: [20, "Username cannot exceed 20 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      trim: true,
      type: String,
      required: true,
      minLength: 8,
      // select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timeStamps: true, collection: "users" }
);
// Mongoose Hooks
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    // console.log(`userVal : ${user}`);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      // console.log(`AuthVal : ${auth}`);
      if (auth) {
        return user;
      } else {
        console.log("idk some errro");
      }
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
const User = mongoose.model("user", userSchema);

export { User };
