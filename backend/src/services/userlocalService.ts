import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { Userlocal } from "../models/userlocal";
import { Local } from "../models";

const get_user_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await Userlocal.findAll();
		if (!result) return res.status(500).json();
		else return res.status(200).json(result);
	} catch (error) {
		res.status(400).json(error);
	}
};

const post_user_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = req.body;
		const userBuilded = Userlocal.build(data);

		const resultValidate = await userBuilded
			.validate()
			.catch((err: ValidationError) => err);

		if ((resultValidate as ValidationError).errors) {
			res.status(409).json((resultValidate as ValidationError).errors);
		}

		const userCreated: any = await userBuilded.save().catch((err) => ({ err }));

		if (userCreated.err) res.status(409).json(userCreated.err.errors);

		return res.status(200).json(userCreated);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const get_user_local_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const user = await Userlocal.findByPk(id);
		if (!user) return res.status(404).json("user not found");

		return res.status(200).json(user);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const put_user_local = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const dataPut = req.body;
		const user = await Userlocal.findByPk(id);

		if (!user) return res.status(404).json("user not found");
		const userUpdated = await user
			.update(dataPut)
			.catch((err: any) => ({ err }));

		if ((userUpdated as any).err) {
			const { errors } = (userUpdated as any).err;
			return res.status(404).json(errors);
		}

		return res.status(200).json(userUpdated);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const delete_user_local_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const userFounded = await Userlocal.findByPk(id);

		if (!userFounded) return res.status(404).json("user not found");

		const companyDeleted: any = await userFounded
			.destroy()
			.catch((err: any) => ({ err }));

		if (companyDeleted.err) return res.status(409).json(companyDeleted.err);

		return res.status(200).json(userFounded);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const get_local_by_userId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;

		const userFounded = await Userlocal.findAll({
			where: {
				id_user: id
			},
			include: {
				model: Local
			}
		});


		if (!userFounded) return res.status(404).json("user not found");
		return res.status(200).json(userFounded);
	} catch (err) {
		return res.status(400).json(err);
	}
}

export default {
	get_user_local,
	post_user_local,
	get_user_local_by_id,
	put_user_local,
	delete_user_local_by_id,
	get_local_by_userId
};
