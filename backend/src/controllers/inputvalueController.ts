import { Request, Response, NextFunction } from "express";
import { default as inputvalueService } from "../services/inputvalueService";

const get_input_value = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await inputvalueService.get_input_value(req, res, next);
};

const post_input_value = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await inputvalueService.post_input_value(req, res, next);
};


const get_input_value_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await inputvalueService.get_input_value_by_id(req, res, next);
};


const put_input_value_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await inputvalueService.put_input_value_by_id(req, res, next);
};

const delete_input_value_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await inputvalueService.delete_input_value_by_id(req, res, next);
};

const get_input_value_by_report_question = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await inputvalueService.get_input_value_by_report_question(req, res, next)
}

const get_input_value_by_report = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await inputvalueService.get_input_value_by_report(req, res, next)
}

export default {
    get_input_value,
    post_input_value,
    get_input_value_by_id,
    put_input_value_by_id,
    delete_input_value_by_id,
	get_input_value_by_report_question,
	get_input_value_by_report
};
