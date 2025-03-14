import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import CardContent from "@mui/material/CardContent";
import LoginComponent from "./login/LoginComponent";
/**
/**
 * The sign in page.
 */

const schema = yup.object().shape({
	email: yup
		.string()
		.email("You must enter a valid email")
		.required("You must enter a email"),
	password: yup
		.string()
		.required("Please enter your password.")
		.min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
	email: "",
	password: "",
	remember: true,
};

function SignInPage() {
	const { control, formState, handleSubmit, setError, setValue } = useForm({
		mode: "onChange",
		defaultValues,
		resolver: yupResolver(schema),
	});

	const [t, i18n] = useTranslation("global");

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
				<CardContent className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
					<div className=" flex flex-col items-center ">
						<img
							className="w-96 "
							src="assets/images/logo/mgi_asesorias_logo.png"
							alt="logo"
						/>

						<Typography className="text-4xl font-extrabold leading-tight tracking-tight">
							Iniciar sesión
						</Typography>
					</div>
					<LoginComponent />
				</CardContent>
			</Paper>

			<Box
				className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
				sx={{ backgroundColor: "primary.main" }}
			>
				<svg
					className="pointer-events-none absolute inset-0"
					viewBox="0 0 960 540"
					width="100%"
					height="100%"
					preserveAspectRatio="xMidYMax slice"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Box
						component="g"
						sx={{ color: "primary.light" }}
						className="opacity-20"
						fill="none"
						stroke="currentColor"
						strokeWidth="100"
					>
						<circle r="234" cx="196" cy="23" />
						<circle r="234" cx="790" cy="491" />
					</Box>
				</svg>
				<Box
					component="svg"
					className="absolute -right-64 -top-64 opacity-20"
					sx={{ color: "primary.light" }}
					viewBox="0 0 220 192"
					width="220px"
					height="192px"
					fill="none"
				>
					<defs>
						<pattern
							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect x="0" y="0" width="4" height="4" fill="currentColor" />
						</pattern>
					</defs>
					<rect
						width="220"
						height="192"
						fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
					/>
				</Box>

				<div className="relative z-10 w-full max-w-2xl">
					<div className="text-7xl font-bold leading-none text-gray-100">
						<div>Bienvenido a</div>
						<div>Food Safe Hub</div>
					</div>
				</div>
			</Box>
		</div>
	);
}

export default SignInPage;
