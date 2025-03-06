import { Request, Response, NextFunction } from "express";
import { default as reportService } from "../services/reportService";

const get_report = async (req: Request, res: Response, next: NextFunction) => {
	return await reportService.get_report(req, res, next);
};

const post_report = async (req: Request, res: Response, next: NextFunction) => {
	return await reportService.post_report(req, res, next);
};

const put_report_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.put_report_by_id(req, res, next);
};

const delete_report_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.delete_report_by_id(req, res, next);
};

const get_report_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.get_report_by_id(req, res, next);
};

const get_report_by_local_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.get_report_by_local_id(req, res, next);
};

const get_report_by_supervisor_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.get_report_by_supervisor_id(req, res, next);
};
const get_report_by_supervisor_id_status = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.get_report_by_supervisor_id_status(req, res, next);
};

const get_report_by_auditor_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.get_report_by_auditor_id(req, res, next);
};
const get_report_by_supervisor_id_historico = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.get_report_by_supervisor_id_historico(
		req,
		res,
		next
	);
};
const get_report_by_client_id_historico = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return await reportService.get_report_by_client_id_historico(req, res, next);
};

export default {
	get_report,
	post_report,
	put_report_by_id,
	delete_report_by_id,
	get_report_by_id,
	get_report_by_local_id,
	get_report_by_supervisor_id,
	get_report_by_auditor_id,
	get_report_by_supervisor_id_status,
	get_report_by_supervisor_id_historico,
	get_report_by_client_id_historico,
};
