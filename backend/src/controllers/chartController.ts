import { Request, Response, NextFunction } from "express";
import { default as chartService } from "../services/chartService";

const post_chartData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await chartService.post_chartData(req, res);
};

export default {
	post_chartData,
};
