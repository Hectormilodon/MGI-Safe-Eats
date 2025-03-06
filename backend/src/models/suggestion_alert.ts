import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface ISuggestionAlert {
  id?: number;
  report_id: string;
  suggestion: string;
}

interface ISuggestionAlertDB extends Model {
  id?: number;
  report_id: string;
  suggestion: string;
  alert_id?: string;
}

const modelName = "suggestions_alert";

const SuggestionAlert = connection.define<ISuggestionAlertDB>(
  modelName,
  {
    report_id: { type: DataTypes.STRING, allowNull: false },
    suggestion: { type: DataTypes.STRING, allowNull: false },
    alert_id: { type: DataTypes.STRING}
  },
  {
    modelName: modelName,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export { SuggestionAlert as default, ISuggestionAlertDB, ISuggestionAlert };
