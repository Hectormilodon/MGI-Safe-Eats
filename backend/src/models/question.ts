import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IQuestion {
  id?: number;
  value: string;
  clasification_id: number;
}

interface IQuestionDB extends Model {
    id?: number;
    value: string;
    clasification_id: number;
}

const modelName = "question";

const Question = connection.define<IQuestionDB>(
  modelName,
  {
    value: { type: DataTypes.STRING, allowNull: false },
    clasification_id: { type: DataTypes.NUMBER }
  },
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);


export { Question as default, IQuestionDB, IQuestion };