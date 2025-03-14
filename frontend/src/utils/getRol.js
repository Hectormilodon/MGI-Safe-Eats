
const roles = {
	1: "Administrador",
	2: "Supervisor",
	3: "Auditor",
	4: "Cliente",
};


export function getRol(rol_id) {
	return roles[rol_id] || roles["default"];
}
