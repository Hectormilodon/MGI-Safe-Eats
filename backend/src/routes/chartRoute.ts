import express from "express";
import { isAuthorized } from "../middleware/auth";
import { default as chartController } from "../controllers/chartController";

const authRoute = express.Router();

authRoute.route("/").post(chartController.post_chartData);

export default authRoute;
