import express from "express";
import { reportController } from "../controllers";
import { isAuthorized } from "../middleware/auth";

const reportRoute = express.Router();

reportRoute
	.route("/")
	.get(isAuthorized, reportController.get_report)
	.post(isAuthorized, reportController.post_report);

reportRoute
	.route("/:id")
	.get(isAuthorized, reportController.get_report_by_id)
	.put(isAuthorized, reportController.put_report_by_id)
	.delete(isAuthorized, reportController.delete_report_by_id);

reportRoute
	.route("/local/:id")
	.get(isAuthorized, reportController.get_report_by_local_id);

reportRoute
	.route("/auditor/:id")
	.get(isAuthorized, reportController.get_report_by_auditor_id);

reportRoute
	.route("/supervisor/:id")
	.get(isAuthorized, reportController.get_report_by_supervisor_id);
reportRoute
	.route("/supervisorHistorico/:id")
	.get(isAuthorized, reportController.get_report_by_supervisor_id_historico);

reportRoute
	.route("/supervisor/:id/:status")
	.get(isAuthorized, reportController.get_report_by_supervisor_id_status);

reportRoute
	.route("/clienteHistorico/:id")
	.get(isAuthorized, reportController.get_report_by_client_id_historico);
export default reportRoute;
