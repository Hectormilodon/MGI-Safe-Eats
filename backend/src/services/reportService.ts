import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Report from "../models/report";
import Inputvalue from "../models/inputvalue";
import { Local, User, Userlocal } from "../models";

const get_report = async (req: Request, res: Response, next: NextFunction) => {
	const result = await Report.findAll({
		order: [
			['id', 'DESC'],
		]
	});
	if (!result) return res.status(500).json();

	return res.status(200).json(result);
};

const post_report = async (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;
	const reportBuilded = Report.build(data);
	const resultValidate = await reportBuilded
		.validate()
		.catch((err: ValidationError) => err);

	if ((resultValidate as ValidationError).errors)
		res.status(409).json((resultValidate as ValidationError).errors);

	const report: any = await reportBuilded.save().catch((err) => ({ err }));

	if (report.err) res.status(409).json(report.err.errors);

	res.status(200).json(report);
};

const get_report_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;

		const report = await Report.findByPk(id, {
			// include: [{
			//   model: Inputvalue
			// }]
		});
		//console.info("🚀 ~ report:", report);
		if (!report) return res.status(404).json("report not found");

		return res.status(200).json(report);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const put_report_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	const dataPut = req.body;
	const objectDB = await Report.findByPk(id);
	const {refused, status_id}  = req.body;
	console.log("status:"+ dataPut.status_id);
	console.log("refused:"+ dataPut.refused);
	if (!objectDB) return res.status(404).json("object not found");
	else {
		const objectUpdated = await objectDB
			.update(dataPut)
			.catch((err) => ({ err }));

		if ((objectUpdated as any).err) {
			const { errors } = (objectUpdated as any).err;
			return res.status(404).json(errors);
		} else return res.status(200).json(objectUpdated);
	}
};

const delete_report_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	const objectFounded = await Report.findByPk(id);

	if (!objectFounded) return res.status(404).json("object not found");
	else {
		const reportDeleted: any = await objectFounded
			.destroy()
			.catch((err) => ({ err }));

		if (reportDeleted.err) return res.status(409).json(reportDeleted.err);
		else return res.status(200).json(objectFounded);
	}
};

const get_report_by_local_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;

	const report = await Report.findAll({
		where: {
			local_id: id,
		},
		include: [
			{ model: Local },
			{ model: User, as: "Auditor" },
			{ model: User, as: "Supervisor" },
		],
		order: [
			['id', 'DESC'],
		]
	});
	if (!report) return res.status(404).json("report not found");

	return res.status(200).json(report);
};

const get_report_by_supervisor_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	/*console.log(
		"🚀 ~ file: reportService.ts:113 ~ constget_report_by_supervisor_id= ~ id:",
		id
	);*/

	const report = await Report.findAll({
		where: {
			supervisor_id: id,
		},
		include: [
			{ model: Local },
			{ model: User, as: "Auditor" },
			{ model: User, as: "Supervisor" },
		],
		order: [
			['id', 'DESC'],
		]
	});
	if (!report) return res.status(404).json("report not found");

	return res.status(200).json(report);
};

const get_report_by_supervisor_id_status = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, status } = req.params;

	const report = await Report.findAll({
		where: {
			supervisor_id: id,
			status_id: status,
		},
		include: [
			{ model: Local },
			{ model: User, as: "Auditor" },
			{ model: User, as: "Supervisor" },
		],
		order: [
			['id', 'DESC'],
		]
	});
	if (!report) return res.status(404).json("report not found");

	return res.status(200).json(report);
};

const get_report_by_supervisor_id_historico = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const report = await Report.findAll({
		where: {
			supervisor_id: id,
			status_id: [2, 3],
		},
		include: [
			{ model: Local },
			{ model: User, as: "Auditor" },
			{ model: User, as: "Supervisor" },
		],
		order: [
			['id', 'DESC'],
		]
	});
	if (!report) return res.status(404).json("report not found");

	return res.status(200).json(report);
};

const get_report_by_client_id_historico = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const report = await Report.findAll({
		where: {
			// supervisor_id: id,
			status_id: [2, 3],
		},
		include: [
			{
				model: Local,
				required: true,
				include: [
					{
						model: Userlocal,
						required: true,
						where: {
							// supervisor_id: id,
							id_user: id,
						},
					},
				]
			},
			{ model: User, as: "Auditor" },
			{ model: User, as: "Supervisor" },
		],
		order: [
			['id', 'DESC'],
		]
	});
	if (!report) return res.status(404).json("report not found");

	return res.status(200).json(report);
};

const get_report_by_auditor_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;

	const report = await Report.findAll({
		where: {
			auditor_id: id,
		},
		include: [
			{ model: Local },
			{ model: User, as: "Auditor" },
			{ model: User, as: "Supervisor" },
		],
		order: [
			['id', 'DESC'],
		]
	});
	if (!report) return res.status(404).json("report not found");

	return res.status(200).json(report);
};

export default {
	get_report_by_id,
	put_report_by_id,
	get_report,
	post_report,
	delete_report_by_id,
	get_report_by_local_id,
	get_report_by_supervisor_id,
	get_report_by_auditor_id,
	get_report_by_supervisor_id_status,
	get_report_by_supervisor_id_historico,
	get_report_by_client_id_historico,
};
