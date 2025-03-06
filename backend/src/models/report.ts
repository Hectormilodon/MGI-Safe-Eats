import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IReport {
	id?: number;
	administrator: string;
	partner: string;
	auditor_id: number;
	supervisor_id: number;
	compliance: string;
	compliance_standard: string;
	local_id: number;
	status_id: number;
	version: string;
	created_at: Date;
	refused: string;
}

interface IReportDB extends Model {
	id?: number;
	administrator: string;
	partner: string;
	auditor_id: number;
	supervisor_id: number;
	compliance: string;
	compliance_standard: string;
	local_id: number;
	status_id: number;
	version: string;
	created_at: Date;
	refused: string;
}

const modelName = "report";

const Report = connection.define<IReportDB>(
	modelName,
	{
		administrator: { type: DataTypes.STRING },
		partner: { type: DataTypes.STRING },
		auditor_id: { type: DataTypes.NUMBER },
		supervisor_id: { type: DataTypes.NUMBER },
		local_id: { type: DataTypes.NUMBER },
		compliance: { type: DataTypes.STRING },
		compliance_standard: { type: DataTypes.STRING },
		status_id: { type: DataTypes.NUMBER },
		version: { type: DataTypes.STRING },
		created_at: { type: DataTypes.DATE },
		refused: { type: DataTypes.STRING }
	},
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);

export { Report as default, IReportDB, IReport };
