import express from "express";
import { clasificationController } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const clasificationRoute = express.Router();

clasificationRoute
	.route("/")
	.get(isAuthorized, clasificationController.get_clasification)
	.post(isAuthorized, clasificationController.post_clasification);

clasificationRoute
	.route("/:id")
	.get(isAuthorized, clasificationController.get_clasification_by_id)
	.put(isAuthorized, clasificationController.put_clasification_by_id)
	.delete(isAuthorized, clasificationController.delete_clasification_by_id)

export default clasificationRoute;
