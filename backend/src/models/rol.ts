import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IRol {
  id?: number;
  name: string;
}

interface IRolDB extends Model {
    id?: number;
    name: string;
}

const modelName = "rol";

const Rol = connection.define<IRolDB>(
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


export { Rol as default, IRolDB, IRol };