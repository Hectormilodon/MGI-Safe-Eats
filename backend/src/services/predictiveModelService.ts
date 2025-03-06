import { Request, Response, NextFunction } from "express";
import axios from "axios";
import Alert from "../models/alert"
import { ValidationError } from "sequelize";
import SuggestionAlert from "../models/suggestion_alert";

const predictiveModelUrl = process.env.PREDICTIVE_MODEL_URL;

const get_report = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const response = await axios.post(`${predictiveModelUrl}/get_report`, {
    "param_list": req.body.param_list
  })
  if(!response || response.status !== 200 ){
    return res.status(400).json("error al conectar con modelo");
  }

  return res.status(200).json(response.data);
  } catch (err){
    return res.status(500).json(err);
  }
}

const post_alerts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alertData = {
      report_id: req.body.report_id,
      local_id: req.body.local_id,
      breach_alert: req.body.breach_alert,
      threashold_alert: req.body.threashold_alert,
    };
    console.log("🚀 ~ constpost_alerts= ~ alertData.req.body:", req.body)

    const alertBuilded = Alert.build(alertData);
    const resultValidate = await alertBuilded.validate().catch((err: ValidationError) => err);

    if ((resultValidate as ValidationError).errors) {
      return res.status(409).json((resultValidate as ValidationError).errors);
    }

    const alertCreated: any = await alertBuilded.save().catch((err) => ({ err }));
    if (alertCreated.err) {
      console.log("🚀 ~ constpost_alerts= ~ alertCreated:", alertCreated)
      return res.status(409).json(alertCreated.err.errors);
    }

    const newSuggestions = req.body.suggestions;
    const suggestionResults = [];
    const suggestionErrors = [];

    if (newSuggestions.length > 0) {
      for (const newSuggestion of newSuggestions) {
        const suggestionData = {
          report_id: req.body.report_id,
          suggestion: newSuggestion,
          alert_id: alertCreated.dataValues.id
        };

        const suggestionBuilded = SuggestionAlert.build(suggestionData);
        const suggestionValidate = await suggestionBuilded.validate().catch((err: ValidationError) => err);

        if ((suggestionValidate as ValidationError).errors) {
          suggestionErrors.push((suggestionValidate as ValidationError).errors);
          continue;
        }

        const suggestionCreated: any = await suggestionBuilded.save().catch((err) => ({ err }));

        if (suggestionCreated.err) {
          suggestionErrors.push(suggestionCreated.err.errors);
        } else {
          suggestionResults.push(suggestionCreated);
        }
      }
    }

    if (suggestionErrors.length > 0) {
      console.log("🚀 ~ constpost_alerts= ~ suggestionErrors:", suggestionErrors)
      return res.status(409).json({ alert: alertCreated, suggestionErrors });
    }

    return res.status(200).json({ alert: alertCreated, suggestionResults });
  } catch (error) {
    return next(error);
  }
};

export default {
	get_report,
  post_alerts,
};
