import _ from "@lodash";

const EmpAdminModel = (data) =>
	_.defaults(data || {}, {
		name: "",
	});

export default EmpAdminModel;
