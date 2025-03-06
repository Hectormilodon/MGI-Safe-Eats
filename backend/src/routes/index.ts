import express from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import localRoute from "../routes/localRoute";
import userlocalRoute from "./userlocalRoute";
import rolRoute from "./rolRoute";
import empAdminRoute from "./empadminRoute";
import reportRoute from "./reportRoute";
import questionRoute from "./questionRoute";
import clasificationRoute from "./clasificationRoute";
import inputValueRoute from "./inputvalueRoute";
import alertRoute from "./alertRoute";
import chartRoute from "./chartRoute";
import predictiveModelRoute from "./predictiveModelRoute";
import suggestionAlertRoute from "./suggestionRoute";

const appRoute = express.Router();

appRoute.use("/auth", authRoute);
appRoute.use("/user", userRoute);
appRoute.use("/local", localRoute);
appRoute.use("/userlocal", userlocalRoute);
appRoute.use("/rol", rolRoute);
appRoute.use("/empadmin", empAdminRoute);
appRoute.use("/report", reportRoute);
appRoute.use("/question", questionRoute);
appRoute.use("/clasification", clasificationRoute);
appRoute.use("/inputvalue", inputValueRoute);
appRoute.use("/alert", alertRoute);
appRoute.use("/chart", chartRoute);
appRoute.use("/predictive_model", predictiveModelRoute);
appRoute.use("/suggestion", suggestionAlertRoute)

export default appRoute;
