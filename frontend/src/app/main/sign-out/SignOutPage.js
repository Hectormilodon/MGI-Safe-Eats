import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import JwtService from "../../auth/services/jwtService";
import { useTranslation } from "react-i18next";
import history from "@history";
import { clearMenus } from 'app/store/fuse/menuActions';
import { useDispatch} from "react-redux";

function SignOutPage() {
	const [t, i18n] = useTranslation("global");
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			JwtService.logout();
			dispatch(clearMenus());
			history.push("/");
		}, 1000);
	}, []);

	return (
		<div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
			<Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
				<div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
					<Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
						{t("logout")}
					</Typography>
				</div>
			</Paper>
		</div>
	);
}

export default SignOutPage;
