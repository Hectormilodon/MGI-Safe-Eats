import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import Local from "../models/local";
import { IUser, IUserlocal, Userlocal } from "../models";

const get_local = async (req: Request, res: Response, next: NextFunction) => {
  const filter: FindOptions = {
    where: {
      active: true,
    },
    order: [["company_name", "ASC"]],
  };
  const result = await Local.findAll(filter);

  if (!result) return res.status(500).json();
  else return res.status(200).json(result);
};

const post_local = async (req: Request, res: Response, next: NextFunction) => {
  const localData = {
    fantasy_name: req.body.fantasy_name,
    active: true,
    premium: req.body.premium,
    address: req.body.address,
    company_name: req.body.company_name,
    rut: req.body.rut,
    num_auth_sani: req.body.num_auth_sani ? req.body.num_auth_sani : "",
    id_emp_admin: req.body.id_emp_admin,
    client_id: req.body.client_id,
  };

  const objectBuilded = Local.build(localData);
  const resultValidate = await objectBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors) {
    return res.status(409).json((resultValidate as ValidationError).errors);
  }

  const localCreated: any = await objectBuilded
    .save()
    .catch((err) => ({ err }));

  if (localCreated.err) res.status(409).json(localCreated.err.errors);

  if (req.body.client_id) {
    const userLocal = {
      id_user: req.body.client_id,
      id_local: localCreated.id,
    };
    await Userlocal.create(userLocal).catch((reason) => {
      console.log("🚀 ~ reason:", reason);
      return res.status(400).json(reason)
    });
  }

  if (req.body.supervisor_id) {
    let userLocal: any = { id_user: req.body.supervisor_id, id_local: localCreated.id }

      await Userlocal.create(userLocal).catch((reason) => {
        console.log("🚀 ~ reason:", reason);
        return res.status(400).json(reason)
      });
  }

  if (req.body.auditor_id) {
    let userLocal: any = { id_user: req.body.auditor_id, id_local: localCreated.id }

      await Userlocal.create(userLocal).catch((reason) => {
        console.log("🚀 ~ reason:", reason);
        return res.status(400).json(reason)
      });
  }
  return res.status(200).json(localCreated);
};

const get_local_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const object = await Local.findByPk(id);
  if (!object) return res.status(404).json("object not found");

  return res.status(200).json(object);
};

const put_local_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Local.findByPk(id);

  if (!objectDB) return res.status(404).json("object not found");

  const objectUpdated = await objectDB
    .update(dataPut)
    .catch((err) => ({ err }));

  if ((objectUpdated as any).err) {
    const { errors } = (objectUpdated as any).err;
    return res.status(404).json(errors);
  }
	await Userlocal.destroy({ where: { id_local: id } });

  if (dataPut.client_id) {
    let userLocal: any = {
      id_user: dataPut.client_id,
      id_local: id as unknown,
    } as IUserlocal;

    await Userlocal.create(userLocal).catch((reason: any) => {
      console.log("🚀 ~ constput_userAdmin= ~ reason:", reason);
    });
  }

  if (dataPut.supervisor_id) {
    let userLocal = { id_user: dataPut.supervisor_id, id_local: id as unknown }

    await Userlocal.create(userLocal).catch((reason: any) => {
      console.log("🚀 ~ constput_userAdmin= ~ reason:", reason);
    });
  }

  if (dataPut.auditor_id) {
    let userLocal = { id_user: dataPut.auditor_id, id_local: id as unknown }

    await Userlocal.create(userLocal).catch((reason: any) => {
      console.log("🚀 ~ constput_userAdmin= ~ reason:", reason);
    });
  }

  return res.status(200).json(objectUpdated);
};

const delete_local_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const filter: FindOptions = {
  //   attributes: { exclude: ["password"] },
  // };
  const id = req.params.id;
  const objectFounded = await Local.findByPk(id);

  if (!objectFounded) return res.status(404).json("object not found");
  else {
    const companyDeleted: any = await objectFounded
      .destroy()
      .catch((err) => ({ err }));

    if (companyDeleted.err) return res.status(409).json(companyDeleted.err);
    else return res.status(200).json(objectFounded);
  }
};

const post_local_by_nom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { fantasy_name } = req.body;
    fantasy_name = fantasy_name.trim().toUpperCase();
    const object = await Local.findAll({
      where: {
        fantasy_name: fantasy_name.trim().toUpperCase(),
        active: true,
      },
    });
    if (!object) return res.status(500).json();

    return res.status(200).json(object);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  get_local,
  post_local,
  get_local_by_id,
  put_local_by_id,
  delete_local_by_id,
  post_local_by_nom,
};
