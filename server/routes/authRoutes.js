import { Router } from "express";
import { LoginUser, signUpNewUser, } from "../controller/authController.js";

const router = Router();

// @desc    Signup route
// @Method  POST
router.post("/signup", signUpNewUser);


// @desc    Login route
// @Method  POST
router.post("/login", LoginUser);

export { router };
