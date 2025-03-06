import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IInputValue {
  id?: number;
  id_user_local: number;
  question_id: number;
  value: number;
  obs: string;
  clasification_id: number;
  created_at: Date | string;
  report_id: number;
  score: number;
}

interface IInputValueDB extends Model {
    id?: number;
    id_user_local: number;
    question_id: number;
    value: number;
    obs: string;
    clasification_id: number;
    created_at: Date | string;
    report_id: number;
    score: number;
}

const modelName = "input_value";

const Inputvalue = connection.define<IInputValueDB>(
  modelName,
  {
    id_user_local: { type: DataTypes.INTEGER },
    question_id: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.STRING },
    obs: { type: DataTypes.STRING },
    clasification_id:{ type: DataTypes.INTEGER, allowNull: false },
    created_at: {type:DataTypes.DATE},
    report_id: { type: DataTypes.STRING },
    score: { type: DataTypes.NUMBER}
  },
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);

export { Inputvalue as default, IInputValueDB, IInputValue };