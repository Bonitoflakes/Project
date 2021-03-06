import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Signup route
// @Method  POST
const signUpNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });

    return res.status(201).json({
      results: 1,
      success: true,
      message: "User created successfully!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      results: 0,
      success: false,
      message: error._message,
    });
  }
};

// @desc Login route
// @Method POST
// @Explanantion uses a static method on the user model called login to hash and compare the password
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    // console.log(`user : ${user}`);
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          id: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return res
        .header("access-token", token)
        .json({ status: true, message: "Login Successful", token });
    } else {
      return res.json({
        status: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(`Login error`);
    console.log(error);
    res.status(400).json({
      results: 0,
      success: false,
      message: error._message,
    });
  }
};

const LogoutUser = async (req, res) => {
  try {
    delete req.headers["access-token"];
    return res.status(200).json({
      ...req.headers,
      status: true,
      message: "User Logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export { signUpNewUser, LoginUser, LogoutUser };
