import express from "express";
import { localControllers } from "../../src/controllers";
import { isAuthorized } from "../middleware/auth";

const localRoute = express.Router();

localRoute
	.route("/")
	.get(isAuthorized, localControllers.get_local)
	.post(isAuthorized, localControllers.post_local);

localRoute
	.route("/:id")
	.get(isAuthorized, localControllers.get_local_by_id)
	.put(isAuthorized, localControllers.put_local_by_id)
	.delete(isAuthorized, localControllers.delete_local_by_id);


localRoute
	.route("/byname")
	.post(localControllers.post_local_by_nom)
	
// localRoute
// 	.route("/local")
// 	.get(localControllers.get_local)
// 	.post(localControllers.post_local);

// localRoute
// 	.route("/local/:id")
// 	.get(localControllers.get_local_by_id)
// 	.put(localControllers.put_local_by_id)
// 	.delete(localControllers.delete_local_by_id);

export default localRoute;
