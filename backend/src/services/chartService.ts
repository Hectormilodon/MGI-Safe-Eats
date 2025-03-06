import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { default as Report, IReportDB, IReport } from "../models/report";
import { Local, User, Userlocal, IUserDB } from "../models";
import { statusEnum, rolEnum } from "../utils/enums";

const post_chartData = async (req: Request, res: Response) => {
	try {
		const { id_user, id_local, dateFrom, dateTo } = req.body;

		let usuario: IUserDB;
		const userFind = await User.findOne({
			where: {
				id: id_user,
			},
		});

		if (userFind) {
			usuario = userFind;
			let includeClause: any[] = [];
			let whereClause: any = {};

			if (usuario.rol_id === rolEnum.Admin) {
				whereClause = { status_id: [statusEnum.APROBADO], local_id: id_local };
			}

			if (usuario.rol_id === rolEnum.Supervisor) {
				whereClause = {
					status_id: [statusEnum.APROBADO],
					supervisor_id: id_user,
					local_id: id_local,
				};
			}

			if (usuario.rol_id === rolEnum.Auditor) {
				whereClause = {
					status_id: [statusEnum.APROBADO],
					auditor_id: id_user,
					local_id: id_local,
				};
			}
			if (usuario.rol_id === rolEnum.Cliente) {
				whereClause = { status_id: [statusEnum.APROBADO], local_id: id_local };
				includeClause.push({
					model: Local,
					required: true,
					include: [
						{
							model: Userlocal,
							required: true,
							where: {
								id_user: id_user,
								id_local: id_local,
							},
						},
					],
				});
			}

			const report = await Report.findAll({
				where: whereClause,
				include: includeClause,
			});

			return res.status(200).json(report);
		}
	} catch (err) {
		return res.status(400).json(err);
	}
};

export default {
	post_chartData,
};
