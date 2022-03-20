import { Router } from "express";
import { getDashboardDetails } from "../controller/dashboardController.js";

const router = Router();

// @desc    Dashboard route
// @Method  GET
router.get('/', getDashboardDetails);

export { router }