import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";
import EmpAdmin from "../models/empadmin";

const get_emp_admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await EmpAdmin.findAll({
      where: {
        active: true
      }
    });

    if (!result) return res.status(500).json();

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const post_emp_admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const objectBuilded = EmpAdmin.build(data);
  const resultValidate = await objectBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const objectCreated: any = await objectBuilded
    .save()
    .catch((err) => ({ err }));

  if (objectCreated.err) res.status(409).json(objectCreated.err.errors);

  res.status(201).json(objectCreated.toJSON());
};

const get_emp_admin_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const object = await EmpAdmin.findByPk(id);
    if (!object) return res.status(404).json("object not found");

    return res.status(200).json(object.toJSON());
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_emp_admin_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const dataPut = req.body;
    const objectDB = await EmpAdmin.findByPk(id);

    if (!objectDB) return res.status(404).json("object not found");
      
    const objectUpdated = await objectDB
      .update(dataPut)
      .catch((err) => ({ err }));

    if ((objectUpdated as any).err) {
      const { errors } = (objectUpdated as any).err;
      return res.status(404).json(errors);
    } 
    
    return res.status(200).json(objectUpdated);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const delete_emp_admin_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const objectFounded = await EmpAdmin.findByPk(id);

  if (!objectFounded) return res.status(404).json("object not found");
  else {
    const companyDeleted: any = await objectFounded
      .destroy()
      .catch((err) => ({ err }));

    if (companyDeleted.err) return res.status(409).json(companyDeleted.err);
    else return res.status(200).json(objectFounded);
  }
};

const post_emp_admin_by_nom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {name} = req.body;
    name = name.trim().toUpperCase();
    const object = await EmpAdmin.findAll({
      where: {
        name: name.trim().toUpperCase(),
        active: true
      }
    });
    if (!object) return res.status(500).json();

    return res.status(200).json(object);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  get_emp_admin,
  post_emp_admin,
  get_emp_admin_by_id,
  put_emp_admin_by_id,
  delete_emp_admin_by_id,
  post_emp_admin_by_nom
};
