import { Router } from "express";
import { getDashboardDetails } from "../controller/dashboardController.js";
import verifyJWT from "./../controller/verifyToken.js";

const router = Router();

// @desc    Dashboard route
// @Method  GET
router.get("/dashboard", verifyJWT, getDashboardDetails);

export { router };
