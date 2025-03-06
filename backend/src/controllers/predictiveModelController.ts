import { Request, Response, NextFunction } from "express";
import { default as predictiveModelService } from "../services/predictiveModelService";


const post_alert = async (req: Request, res: Response, next: NextFunction) => {
  return await predictiveModelService.post_alerts(req, res, next);
}

const get_report = async (req: Request, res: Response, next: NextFunction) => {
  return await predictiveModelService.get_report(req, res, next);
}

export default {
  post_alert,
  get_report
};
