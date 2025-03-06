import express from "express";
import { empadminController } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const empAdminRoute = express.Router();

empAdminRoute
	.route("/")
	.get(isAuthorized, empadminController.get_emp_admin)
	.post(isAuthorized, empadminController.post_emp_admin);

empAdminRoute
	.route("/:id")
	.get(isAuthorized, empadminController.get_emp_admin_by_id)
	.put(isAuthorized, empadminController.put_emp_admin_by_id)
	.delete(isAuthorized, empadminController.delete_emp_admin_by_id)

empAdminRoute
	.route("/byname")
	.post(isAuthorized, empadminController.post_emp_admin_by_nom)

export default empAdminRoute;
