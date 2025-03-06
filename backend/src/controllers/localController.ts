import { Request, Response, NextFunction } from "express";
import { default as localService } from "../services/localService";

const get_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await localService.get_local(req, res, next);
};

const post_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await localService.post_local(req, res, next);
};


const put_local_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await localService.put_local_by_id(req, res, next);
};


const delete_local_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await localService.delete_local_by_id(req, res, next);
};

const get_local_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await localService.get_local_by_id(req, res, next);
  };

  const post_local_by_nom = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await localService.post_local_by_nom(req, res, next);
  };

export default {
	get_local,
	post_local,
	put_local_by_id,
    delete_local_by_id,
	get_local_by_id,
	post_local_by_nom
};
