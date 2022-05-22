import { Router } from "express";
import { getAllHoldings } from "../controller/holdingController.js";

const holdingRouter = Router();

holdingRouter.get("/holdings", getAllHoldings);

export { holdingRouter };
