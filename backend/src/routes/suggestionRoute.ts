import express from "express";
import { SuggestionController } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const suggestionAlertRoute = express.Router();

suggestionAlertRoute
	.route("/")
	.get(isAuthorized, SuggestionController.get_suggestions)
	.post(isAuthorized, SuggestionController.post_suggestion);

  suggestionAlertRoute
	.route("/:id")
	.get(isAuthorized, SuggestionController.get_suggestion_by_alertId)

  export default suggestionAlertRoute;
