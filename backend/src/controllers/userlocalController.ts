import { Request, Response, NextFunction } from "express";
import { default as userlocalService } from "../services/userlocalService";

const get_user_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userlocalService.get_user_local(req, res, next);
};

const post_user_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userlocalService.post_user_local(req, res, next);
};


const put_user_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userlocalService.put_user_local(req, res, next);
};


const delete_user_local_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userlocalService.delete_user_local_by_id(req, res, next);
};

const get_user_local_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await userlocalService.get_user_local_by_id(req, res, next);
  };

const get_local_by_userId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await userlocalService.get_local_by_userId(req, res, next);
}

export default {
	get_user_local,
	post_user_local,
	put_user_local,
    delete_user_local_by_id,
	get_user_local_by_id,
	get_local_by_userId
};