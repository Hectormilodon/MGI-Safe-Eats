import _ from "@lodash";

const LocalAdminModel = (data) =>
	_.defaults(data || {}, {
		fantasy_name: "",
        premium: false,
        address: "",
        company_name: "",
        rut: "",
        num_auth_sani: "",
        id_emp_admin: ""
	});

export default LocalAdminModel;