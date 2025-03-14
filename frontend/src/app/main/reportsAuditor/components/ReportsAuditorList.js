import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import FuseLoading from "@fuse/core/FuseLoading";
import ReportsAuditorListItem from "./ReportsAuditorListItem";
import { ApiReport, endpoints_report } from "src/app/api/reportApi";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "app/store/userSlice";

export default function ReportsAuditorList() {
  const [reports, setReports] = React.useState([]);
	
  const api = new ApiReport();

	const user = useSelector(selectUser)

  const getReports = async () => {
    try {
      const response = await api.get(endpoints_report.REPORTBYAUDITOR, user.data.id);
      setReports(response);
    } catch (error) {
      return [];
    }
  };

  React.useEffect(() => {
    getReports();
  }, []);

  if (!reports) {
    return <FuseLoading />;
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-col flex-auto w-full max-h-full"
    >
      <motion.div>
				<h3 style={{textAlign: 'center', margin: '10px auto'}}>
					Mis Auditorías
				</h3>
      </motion.div>
      {reports.map((report, key) => {
        return (
          <div key={key} className="relative">
            <Divider />
            <List className="w-full m-0 p-0">
              <ReportsAuditorListItem key={report.id} report={report} />
            </List>
          </div>
        );
      })}
    </motion.div>
  );
}