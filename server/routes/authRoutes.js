import { Router } from "express";
import { LoginNewUser, LoginUser, signUpNewUser, signUpUser } from "../controller/authController.js";

const router = Router();

// @desc    Signup route
// @Method  GET
router.get("/signup", signUpUser);

// @desc    Signup route
// @Method  POST
router.post("/signup", signUpNewUser);

// @desc    Login route
// @Method  GET
router.get("/login", LoginUser);

// @desc    Login route
// @Method  POST
router.post("/login", LoginNewUser);

export { router };