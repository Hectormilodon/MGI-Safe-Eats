import express from "express";
import { questionController } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const questionRoute = express.Router();

questionRoute
	.route("/")
	.get(isAuthorized, questionController.get_question)
	.post(isAuthorized, questionController.post_question);

questionRoute
	.route("/:id")
	.get(isAuthorized, questionController.get_question_by_id)
	.put(isAuthorized, questionController.put_question_by_id)
	.delete(isAuthorized, questionController.delete_question_by_id)

export default questionRoute;
