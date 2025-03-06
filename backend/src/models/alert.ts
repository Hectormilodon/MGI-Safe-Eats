import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IAlert {
  id?: number;
  breach_alert?: string;
  threashold_alert?: string;
  report_id: string;
  local_id: string;
}

interface IAlertDB extends Model {
    id?: number;
    breach_alert?: string;
    threashold_alert?: string;
    report_id: string;
    local_id: string;
}

const modelName = "alerts";

const Alert = connection.define<IAlertDB>(
  modelName,
  {
    breach_alert: { type: DataTypes.STRING },
    threashold_alert: { type: DataTypes.STRING },
    report_id: { type: DataTypes.STRING, allowNull: false },
    local_id: { type: DataTypes.STRING, allowNull: false },
  },
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);


export { Alert as default, IAlertDB, IAlert };