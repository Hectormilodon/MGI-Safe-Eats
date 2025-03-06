import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Clasification from "../models/clasification";

const get_clasification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await Clasification.findAll();

  if (!result) return res.status(500).json();

  return res.status(200).json(result);
};

const post_clasification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const clasificationBuilded = Clasification.build(data);
  const resultValidate = await clasificationBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const clasification: any = await clasificationBuilded
    .save()
    .catch((err: any) => ({ err }));

  if (clasification.err) res.status(409).json(clasification.err.errors);

  res.status(200).json(clasification);
};

const get_clasification_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const clasification = await Clasification.findByPk(id);
    if (!clasification) return res.status(404).json("clasification not found");

    return res.status(200).json(clasification);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

const put_clasification_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Clasification.findByPk(id);

  if (!objectDB) return res.status(404).json("object not found");
  else {
    const objectUpdated = await objectDB
      .update(dataPut)
      .catch((err: any) => ({ err }));

    if ((objectUpdated as any).err) {
      const { errors } = (objectUpdated as any).err;
      return res.status(404).json(errors);
    } else return res.status(200).json(objectUpdated);
  }
};

const delete_clasification_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const objectFounded = await Clasification.findByPk(id);

  if (!objectFounded) return res.status(404).json("object not found");
  else {
    const clasificationDeleted: any = await objectFounded
      .destroy()
      .catch((err:any) => ({ err }));

    if (clasificationDeleted.err)
      return res.status(409).json(clasificationDeleted.err);
    else return res.status(200).json(objectFounded);
  }
};

export default {
  get_clasification_by_id,
  put_clasification_by_id,
  get_clasification,
  post_clasification,
  delete_clasification_by_id,
};
