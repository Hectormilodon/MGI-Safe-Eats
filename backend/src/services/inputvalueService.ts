import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Inputvalue from "../models/inputvalue";

const get_input_value = async (req: Request, res: Response, next: NextFunction) => {
  const filter: FindOptions = {
    // attributes: { exclude: ["password"] },
  };
  const result = await Inputvalue.findAll(filter);

  if (!result) return res.status(500).json();
  else return res.status(200).json(result);
};
  
const post_input_value = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  console.log("🚀 ~ constpost_input_value= ~ data:", data)
  const objectBuilded = Inputvalue.build(data);
  const resultValidate = await objectBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);
  else {
    const objectCreated: any = await objectBuilded
      .save()
      .catch((err) => ({ err }));

    if (objectCreated.err) res.status(409).json(objectCreated.err.errors);
    else res.status(201).json(objectCreated);
  }
};

const get_input_value_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  //   const filter:FindOptions = {where:{
  //   }}
  const object = await Inputvalue.findByPk(id);
  if (!object) return res.status(404).json("object not found");

  return res.status(200).json(object.toJSON());
};

const get_input_value_by_report_question = async (  
  req: Request,
  res: Response,
  next: NextFunction) => {
  const result = await Inputvalue.findOne({
    where: {
      report_id: req.body.report_id,
      question_id: req.body.question_id
    }
  });

  if (!result) return res.status(200).json([]);
  else return res.status(200).json(result);
}

const get_input_value_by_report = async (  
  req: Request,
  res: Response,
  next: NextFunction) => {
  const result = await Inputvalue.findAll({
    where: {
      report_id: req.params.id
    }
  });

  if (!result) return res.status(500).json();
  else return res.status(200).json(result);
}

const put_input_value_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Inputvalue.findByPk(id);

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

const delete_input_value_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const filter: FindOptions = {
  //   attributes: { exclude: ["password"] },
  // };
  const id = req.params.id;
  const objectFounded = await Inputvalue.findByPk(id);

  if (!objectFounded) return res.status(404).json("object not found");
  else {
    const companyDeleted: any = await objectFounded
      .destroy()
      .catch((err) => ({ err }));

    if (companyDeleted.err) return res.status(409).json(companyDeleted.err);
    else return res.status(200).json(objectFounded);
  }
};

export default {
    get_input_value,
    post_input_value,
    get_input_value_by_id,
    put_input_value_by_id,
    delete_input_value_by_id,
    get_input_value_by_report_question,
    get_input_value_by_report
};
