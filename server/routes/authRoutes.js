import { Router } from "express";
import verifyJWT from "./../controller/verifyToken.js";
import {
  LoginUser,
  signUpNewUser,
  LogoutUser,
} from "../controller/authController.js";

const router = Router();

// @desc    Signup route
// @Method  POST
router.post("/signup", signUpNewUser);

// @desc    Login route
// @Method  POST
router.post("/login", LoginUser);

router.post("/logout", verifyJWT, LogoutUser);

export { router };
