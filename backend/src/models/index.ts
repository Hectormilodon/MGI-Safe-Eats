export { db } from "../config/index";
export {
	default as Clasification,
	IClasificationDB,
	IClasification,
} from "./clasification";
export { default as EmpAdmin, IEmpAdminDB, IEmpAdmin } from "./empadmin";
export {
	default as InputValue,
	IInputValueDB,
	IInputValue,
} from "./inputvalue";
export { default as Local, ILocalDB, ILocal } from "./local";
export { default as Question, IQuestionDB, IQuestion } from "./question";
export { default as Report, IReport, IReportDB } from "./report";
export { default as Rol, IRol, IRolDB } from "./rol";
export { Userlocal, IUserlocal, IUserlocalDB } from "./userlocal";
export { default as User, IUser, IUserDB } from "./user";

import "../assosiations/assosiations";
