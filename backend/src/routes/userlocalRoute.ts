import express from "express";
import { userlocalController } from "../../src/controllers";
import { isAuthorized } from "../middleware/auth";

const userlocalRoute = express.Router();

userlocalRoute
	.route("/")
	.get(isAuthorized, userlocalController.get_user_local)
	.post(isAuthorized, userlocalController.post_user_local)

userlocalRoute
	.route("/byUser/:id")
	.get(isAuthorized, userlocalController.get_local_by_userId)

userlocalRoute
	.route("/:id")
	.get(isAuthorized, userlocalController.get_user_local_by_id)
	.put(isAuthorized, userlocalController.put_user_local)
	.delete(isAuthorized, userlocalController.delete_user_local_by_id)


export default userlocalRoute;
