import React from "react";
import { ApiAlert, endpoints_alerts } from "app/api/alertsApi";
import { ApiSuggestionAlert, endpoints_suggestionsAlerts } from "app/api/suggestionAlertsApi";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import FuseLoading from "@fuse/core/FuseLoading";
import AlertListItem from "./AlertListItem";
import { useParams } from "react-router-dom";

export default function AlertsList() {
	const [alerts, setAlerts] = React.useState([]);

  const api = new ApiAlert();
	const suggestionApi = new ApiSuggestionAlert();

	const params = useParams()
  const getAlerts = async () => {
    const alerts = await api.get(endpoints_alerts.ALERT(params.id));
		if(alerts && alerts.length){
			alerts.map(async (alert) => {
				const suggestions = await suggestionApi.get(endpoints_suggestionsAlerts.SUGGESTIONS_BY_ALERT(alert.id));
				if(suggestions){
					alert.suggestions = suggestions;
				}
			})
		}
    setAlerts(alerts);
  };


  const setText = (text) => {
    let finalText = text.toLowerCase();
    finalText = finalText[0].toUpperCase() + finalText.substring(1);
    return finalText;
  };

  React.useEffect(() => {
    getAlerts();
  }, []);


	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			className="flex flex-col flex-auto w-full max-h-full"
		>
			{alerts.map((alert, key) => {
				return (
					<div key={key} className="relative">
						<Divider />
						<List className="w-full m-0 p-0">
							<AlertListItem
								key={alert.id}
								alert={alert}
							/>
						</List>
					</div>
				);
			})}
		</motion.div>
	);
}
