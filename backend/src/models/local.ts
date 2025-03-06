import { Model } from "sequelize";
import { db } from "../config/index";
import { mode } from "crypto-js";

const { connection, DataTypes } = db;

interface ILocal {
	id?: number;
	fantasy_name: string;
	active: boolean;
	premium: boolean;
	address: string;
	company_name: string;
	rut: string;
	num_auth_sani: string;
	createdAt?: Date | string;
	updatedAt?: Date | string;
	client_id: number;
}

interface ILocalDB extends Model {
	id?: number;
	fantasy_name: string;
	active: boolean;
	premium: boolean;
	address: string;
	company_name: string;
	rut: string;
	num_auth_sani: string;
	id_emp_admin: number;
	createdAt?: Date | string;
	updatedAt?: Date | string;
	client_id: number;
}

const modelName = "local";

const Local = connection.define<ILocalDB>(
	modelName,
	{
		fantasy_name: { type: DataTypes.STRING, allowNull: false },
		active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		premium: { type: DataTypes.BOOLEAN, allowNull: false },
		address: { type: DataTypes.STRING, allowNull: false },
		company_name: { type: DataTypes.STRING, allowNull: false },
		rut: { type: DataTypes.STRING, allowNull: false },
		num_auth_sani: { type: DataTypes.STRING },
		id_emp_admin: { type: DataTypes.INTEGER },
		client_id: { type: DataTypes.INTEGER, allowNull: false}
	},
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);

export { Local as default, ILocalDB, ILocal };
