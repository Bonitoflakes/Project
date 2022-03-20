import { User } from "../models/userModel.js";
import  jwt  from "jsonwebtoken";

// @desc    Signup route
// @Method  POST
const signUpNewUser = async (req, res) => {
   try {

       const { username,email, password } = req.body;
       const user = await User.create({username,email,password})

       res.status(201).json({
           results: 1,
           success: true,
           message: 'User created successfully!!'
       })
   } catch (error) {
       console.log(error);
       res.status(400).json({
           results: 0,
           success: false,
           message: error._message
       })
   }
}

const LoginUser = async (req,res) => {
    try {
        
        const { email, password } = req.body;
        const user =  await User.findOne({email,password})
        console.log(user);
        if (user) {
            const token = jwt.sign({
                name: user.name,
                id:user._id
            },process.env.SECRET_KEY)
            return res.json({status:true,message:"Login Successful",token})
        } else {
            return res.json({status:false,message:"Invalid username or password"})
        }
        
    } catch (error) {
        console.log(`Login error`);
        console.log(error);
        res.status(400).json({
            results: 0,
            success: false,
            message: error._message
        })
    }
}


export { signUpNewUser, LoginUser }