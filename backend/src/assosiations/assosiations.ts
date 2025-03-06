// import User from "../models/user";
// import Clasification from "../models/clasification";
import Local from "../models/local";
// import EmpAdmin from "../models/empadmin";
import Inputvalue from "../models/inputvalue";
// import Question from "../models/question";
import Report from "../models/report";
import { User } from "../models";
// import Rol from "../models/rol";
import { Userlocal } from "../models/userlocal";

const assosiation = () => {
	Report.hasMany(Inputvalue, { foreignKey: "report_id" });
	Inputvalue.belongsTo(Report, { foreignKey: "report_id" });

	Local.hasMany(Report, { foreignKey: "local_id" });
	Report.belongsTo(Local, { foreignKey: "local_id" });

	User.hasMany(Userlocal, { foreignKey: "id_user" });
	Userlocal.belongsTo(User, { foreignKey: "id_user" });

	Local.hasMany(Userlocal, { foreignKey: "id_local" });
	Userlocal.belongsTo(Local, { foreignKey: "id_local" });

	User.hasMany(Report, { foreignKey: "auditor_id", as: "Auditor" });
	Report.belongsTo(User, { foreignKey: "auditor_id", as: "Auditor" });

	User.hasMany(Report, { foreignKey: "supervisor_id", as: "Supervisor" });
	Report.belongsTo(User, { foreignKey: "supervisor_id", as: "Supervisor" });
};

assosiation();
