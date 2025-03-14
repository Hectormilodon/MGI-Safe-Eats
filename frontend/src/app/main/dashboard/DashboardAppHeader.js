import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function DashboardAppHeader(props) {
	const [t, i18n] = useTranslation("global");
	return (
		<div className="flex w-full container">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0">
				<div className="flex flex-col flex-auto">
					<Typography className="text-3xl font-semibold tracking-tight leading-8">
						Food Safe Hub
					</Typography>
					<Typography
						className="font-medium tracking-tight"
						color="text.secondary"
					>
						Servicios de Asesorías en Ingeniería en Alimentos
					</Typography>
				</div>
			</div>
		</div>
	);
}

export default DashboardAppHeader;
