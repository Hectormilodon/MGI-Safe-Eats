import { Request, Response, NextFunction } from "express";
import { default as questionService } from "../services/questionService";

const get_question = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await questionService.get_question(req, res, next);
};

const post_question = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await questionService.post_question(req, res, next);
};


const put_question_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await questionService.put_question_by_id(req, res, next);
};


const delete_question_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await questionService.delete_question_by_id(req, res, next);
};

const get_question_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await questionService.get_question_by_id(req, res, next);
  };

export default {
	get_question,
	post_question,
	put_question_by_id,
    delete_question_by_id,
	get_question_by_id
};
