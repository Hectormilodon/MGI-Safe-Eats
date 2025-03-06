import { Model } from "sequelize";
import { db } from "../config/index";

const { connection, DataTypes } = db;

interface IEmpAdmin {
  id?: number;
  name: string;
  active: boolean;
}

interface IEmpAdminDB extends Model {
    id?: number;
    name: string;
    active: boolean;
}

const modelName = "emp_admin";

const EmpAdmin = connection.define<IEmpAdminDB>(
  modelName,
  {
    name: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  },
	{
		modelName: modelName,
		createdAt: false,
		updatedAt: false,
		freezeTableName: true,
	}
);


export { EmpAdmin as default, IEmpAdminDB, IEmpAdmin };