import express from "express";
import { predictiveModelController } from "../controllers";

const predictiveModelRoute = express.Router();

predictiveModelRoute.route("/alert").post(predictiveModelController.post_alert);
predictiveModelRoute.route("/get_report").post(predictiveModelController.get_report);


export default predictiveModelRoute;
