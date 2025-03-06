import { Request, Response, NextFunction } from "express";
import { default as clasificationService } from "../services/clasificationService";

const get_clasification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await clasificationService.get_clasification(req, res, next);
};

const post_clasification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await clasificationService.post_clasification(req, res, next);
};


const put_clasification_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await clasificationService.put_clasification_by_id(req, res, next);
};


const delete_clasification_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await clasificationService.delete_clasification_by_id(req, res, next);
};

const get_clasification_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await clasificationService.get_clasification_by_id(req, res, next);
  };

export default {
	get_clasification,
	post_clasification,
	put_clasification_by_id,
    delete_clasification_by_id,
	get_clasification_by_id
};
