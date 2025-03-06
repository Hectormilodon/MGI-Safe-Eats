import { Request, Response, NextFunction } from "express";
import { default as empAdminService } from "../services/empadminService";

const get_emp_admin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await empAdminService.get_emp_admin(req, res, next);
};

const post_emp_admin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await empAdminService.post_emp_admin(req, res, next);
};


const put_emp_admin_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await empAdminService.put_emp_admin_by_id(req, res, next);
};


const delete_emp_admin_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await empAdminService.delete_emp_admin_by_id(req, res, next);
};

const get_emp_admin_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await empAdminService.get_emp_admin_by_id(req, res, next);
  };

const post_emp_admin_by_nom = async (
	req: Request,
	res: Response,
	next: NextFunction
  ) => {
	return await empAdminService.post_emp_admin_by_nom(req, res, next);
  };

export default {
	get_emp_admin,
	post_emp_admin,
	put_emp_admin_by_id,
    delete_emp_admin_by_id,
	get_emp_admin_by_id,
	post_emp_admin_by_nom
};
