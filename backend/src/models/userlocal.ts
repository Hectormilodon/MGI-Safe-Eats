import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IUserlocal {
	id?: number;
	id_user: number;
	id_local: number;
}

interface IUserlocalDB extends Model {
	id?: number;
	id_user: number;
	id_local: number;
}

const modelName = "user_local";

const Userlocal = connection.define<IUserlocalDB>(
	modelName,
	{
		id_user: { type: DataTypes.NUMBER, allowNull: false },
		id_local: { type: DataTypes.NUMBER, allowNull: false },
	},
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);

export { Userlocal, IUserlocalDB, IUserlocal };
