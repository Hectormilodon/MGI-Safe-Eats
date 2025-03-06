import { Request, Response, NextFunction } from "express";
import { default as alertService } from "../services/alertService";

const get_alert = async (req: Request, res: Response, next: NextFunction) => {
	return await alertService.get_alert_by_local_id(req, res, next);
};

export default {
	get_alert
};
