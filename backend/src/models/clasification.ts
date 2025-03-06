import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IClasification {
  id?: number;
  name: string;
}

interface IClasificationDB extends Model {
    id?: number;
    name: string;
}

const modelName = "clasification";

const Clasification = connection.define<IClasificationDB>(
  modelName,
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);


export { Clasification as default, IClasificationDB, IClasification };