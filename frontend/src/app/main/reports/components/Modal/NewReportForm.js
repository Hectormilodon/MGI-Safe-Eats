import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import * as yup from "yup";
import _ from "@lodash";
import history from "@history";

import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { selectUser } from "../../../../store/userSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ApiReport, endpoints_report } from "src/app/api/reportApi";

function NewReportForm(props) {
	const { setReportId, handleClose } = props;

	const user = useSelector(selectUser);
	const routeParams = useParams();
	const api = new ApiReport();

	const handleOnClose = () => {
		history.back();
	};

	const schema = yup.object().shape({
		administrator: yup.string().required("Nombre administrador es requerido"),
		partner: yup.string().optional(),
		created_at: yup.date().required("Fecha es requerida"),
		version: yup.string().required("Versión es requerida"),
	});

	const notifyAddOk = () =>
		toast.success("Auditoría creada con exito", {
			position: "top-center",
			autoClose: 1000,
		});

	const notifyAddError = () =>
		toast.error("No se pudo crear la auditoría", {
			position: "top-center",
			autoClose: 1000,
		});

	const { control, reset, handleSubmit, formState } = useForm({
		mode: "onChange",
		resolver: yupResolver(schema),
		defaultValues: {
			administrator: "",
			partner: "",
		},
	});

	const { isValid, dirtyFields, errors } = formState;

  async function onSubmit(data) {
    try {
      const report = data;
      report.auditor_id = user.data.id;
      report.compliance_standard = "100%";
      report.local_id = routeParams.id;
      report.status_id = 4;
      
      const newReport = await api.post(endpoints_report.REPORT, report);
      setReportId(newReport.id)
      notifyAddOk();
			handleClose();
    } catch (error) {
			console.log(error)
      notifyAddError();
    }
  }

	return (
		<div>
			<Box sx={{ margin: "10px 260px", width: "15px" }}>
				<Button onClick={handleOnClose} color="error" variant="contained">
					<span>Cancelar</span>
				</Button>
			</Box>

			<div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
				<Controller
					control={control}
					name="administrator"
					render={({ field }) => {
						return (
							<TextField
								className="mt-32"
								{...field}
								label="Nombre Administrador"
								placeholder="Administrador de local"
								id="administrador"
								error={!!errors.administrator}
								helperText={errors?.administrator?.message}
								variant="outlined"
								required
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>
												heroicons-solid:user-circle
											</FuseSvgIcon>
										</InputAdornment>
									),
								}}
							/>
						);
					}}
				/>

				<Controller
					control={control}
					name="partner"
					render={({ field }) => {
						return (
							<TextField
								className="mt-32"
								{...field}
								label="Nombre Acompañante"
								placeholder="Acompañante"
								id="partner"
								error={!!errors.partner}
								helperText={errors?.partner?.message}
								variant="outlined"
								required
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>
												heroicons-solid:user-circle
											</FuseSvgIcon>
										</InputAdornment>
									),
								}}
							/>
						);
					}}
				/>
				<Controller
					control={control}
					name="created_at"
					render={({ field }) => {
						return (
							<DatePicker
								{...field}
								id="created_at"
								className="mt-32"
								variant="outlined"
								required
								fullWidth
								label="Fecha Auditoría"
								format="dd-MM-yyyy"
								error={!!errors.created_at}
								helperText={errors?.created_at?.message}
								sx={{width: "100%"}}
							/>
						);
					}}
				/>

				<Controller
					control={control}
					name="version"
					render={({ field }) => {
						return (
							<TextField
								className="mt-32"
								{...field}
								label="Versión"
								placeholder="Ejemplo: V1.0"
								id="version"
								error={!!errors.version}
								helperText={errors?.version?.message}
								variant="outlined"
								required
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>
												heroicons-solid:user-circle
											</FuseSvgIcon>
										</InputAdornment>
									),
								}}
							/>
						);
					}}
				/>
			</div>

			<Box
				className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
				sx={{ backgroundColor: "background.default" }}
			>
				<Button
					className="ml-8"
					variant="contained"
					color="secondary"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={handleSubmit(onSubmit)}
				>
					Guardar
				</Button>
			</Box>
		</div>
	);
}

export default NewReportForm;
