import _ from "@lodash";

const UserModel = (data) =>
	_.defaults(data || {}, {
		name: "",
		email: "",
		password: "",
		rol_id: "",
	});

export default UserModel;
