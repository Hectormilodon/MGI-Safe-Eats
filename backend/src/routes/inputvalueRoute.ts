import express from "express";
import { inputvalueController } from "../../src/controllers";
import { isAuthorized } from "../middleware/auth";

const inputvalueRoute = express.Router();

inputvalueRoute
	.route("/")
	.get(isAuthorized, inputvalueController.get_input_value)
	.post(isAuthorized, inputvalueController.post_input_value);

inputvalueRoute
	.route("/:id")
	.get(isAuthorized, inputvalueController.get_input_value_by_id)
	.put(isAuthorized, inputvalueController.put_input_value_by_id)
	.delete(isAuthorized, inputvalueController.delete_input_value_by_id)

inputvalueRoute
	.route("/reportQuestion")
	.post(isAuthorized, inputvalueController.get_input_value_by_report_question)

inputvalueRoute
	.route("/report/:id")
	.get(isAuthorized, inputvalueController.get_input_value_by_report);
export default inputvalueRoute;