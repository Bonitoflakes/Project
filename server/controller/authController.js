import { User } from "../models/userModel.js";


// @desc    Signup route
// @Method  POST
const signUpNewUser = async (req, res) => {
   try {
       console.log(`new user signup route`);

       const { username, password } = req.body;
       const user = await User.create({username,password})

        res.status(200).json({
           results: 1,
            status: "success",
            data: {
             user
           }
       })
   } catch (error) {
       console.log(error);
       res.status(400).json({
           results: 0,
           status: "failure"
       })
   }
}


const signUpUser = () => {
    console.log(`user signup route`);
}


const LoginNewUser = () => {
    console.log(`new user Login route`);
}


const LoginUser = () => {
    console.log(`Login route`);
}
export { signUpNewUser, signUpUser, LoginNewUser, LoginUser }