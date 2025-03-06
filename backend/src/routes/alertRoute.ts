import express from "express";
import { isAuthorized } from "../middleware/auth";
import { default as alertController } from "../controllers/alertController";

const authRoute = express.Router();

authRoute.route("/:local_id").get(alertController.get_alert);

export default authRoute;
