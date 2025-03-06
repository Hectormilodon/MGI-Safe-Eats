import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Local from "../models/local";
import Alert from "../models/alert";

const get_alert_by_local_id = async (req: Request, res: Response, next: NextFunction) => {
	const localId = req.params.local_id;

	const object = await Alert.findAll({
		where: { local_id: localId}
	})
	if (!object) return res.status(404).json("object not found");

	return res.status(200).json(object);
	// const alerts = [
	// 	{
	// 		threshold_alert: "BAJO",
	// 		breach_alert: "NINGUNA",
	// 		suggestions: [
	// 			"Sugerencia 1",
	// 			"Sugerencia 2",
	// 			"Sugerencia 3",
	// 			"Sugerencia 4",
	// 		],
	// 	},
	// 	{
	// 		threshold_alert: "ALTA",
	// 		breach_alert: "MEJORAR",
	// 		suggestions: [
	// 			"Sugerencia 1",
	// 			"Sugerencia 2",
	// 			"Sugerencia 3",
	// 			"Sugerencia 4",
	// 		],
	// 	},
	// 	{
	// 		threshold_alert: "MEDIA",
	// 		breach_alert: "COMPRENDER",
	// 		suggestions: [
	// 			"Sugerencia 1",
	// 			"Sugerencia 2",
	// 			"Sugerencia 3",
	// 			"Sugerencia 4",
	// 		],
	// 	},
	// ];
};

export default {
	get_alert_by_local_id,
};
