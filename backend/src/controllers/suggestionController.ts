import { Request, Response, NextFunction } from "express";
import { default as SuggestionAlert } from "../services/suggestionAlertService";

const get_suggestions = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await SuggestionAlert.get_suggestions(req, res, next);
};

const get_suggestion_by_alertId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await SuggestionAlert.get_suggestion_by_alertId(req, res, next);
}

const post_suggestion = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await SuggestionAlert.post_suggestion(req, res, next);
};


export default {
	get_suggestions,
	post_suggestion,
	get_suggestion_by_alertId,
};
