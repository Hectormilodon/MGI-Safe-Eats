import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import SuggestionAlert from "../models/suggestion_alert";

const get_suggestions = async (req: Request, res: Response, next: NextFunction) => {

  const result = await SuggestionAlert.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_suggestion = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const suggestionBuilded = SuggestionAlert.build(data);
  const resultValidate = await suggestionBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const suggestionCreated: any = await suggestionBuilded
    .save()
    .catch((err) => ({ err }));

  if (suggestionCreated.err) res.status(409).json(suggestionCreated.err.errors);

  res.status(200).json(suggestionCreated);
};

const get_suggestion_by_alertId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const suggestions = await SuggestionAlert.findAll({
      where: {
        alert_id: id
      }
    });
    if (!suggestions) return res.status(404).json("suggestions not found");
    
    return res.status(200).json(suggestions);
  } catch (err) {
    return res.status(400).json(err);
  }
};


export default {
  get_suggestion_by_alertId,
  get_suggestions,
  post_suggestion,
};
