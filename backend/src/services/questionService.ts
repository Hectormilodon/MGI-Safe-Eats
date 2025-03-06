import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Question from "../models/question";

const get_question = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Question.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_question = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const questionBuilded = Question.build(data);
  const resultValidate = await questionBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const question: any = await questionBuilded
    .save()
    .catch((err) => ({ err }));

  if (question.err) res.status(409).json(question.err.errors);

  res.status(200).json(question);
};

const get_question_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json("rol not found");
    
    return res.status(200).json(question);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_question_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Question.findByPk(id);

  if (!objectDB) return res.status(404).json("object not found");
  else {
    const objectUpdated = await objectDB
      .update(dataPut)
      .catch((err) => ({ err }));

    if ((objectUpdated as any).err) {
      const { errors } = (objectUpdated as any).err;
      return res.status(404).json(errors);
    } else return res.status(200).json(objectUpdated);
  }
};

const delete_question_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const objectFounded = await Question.findByPk(id);

  if (!objectFounded) return res.status(404).json("object not found");
  else {
    const questionDeleted: any = await objectFounded
      .destroy()
      .catch((err) => ({ err }));

    if (questionDeleted.err)
      return res.status(409).json(questionDeleted.err);
    else return res.status(200).json(objectFounded);
  }
};


export default {
  get_question_by_id,
  put_question_by_id,
  get_question,
  post_question,
  delete_question_by_id
};
