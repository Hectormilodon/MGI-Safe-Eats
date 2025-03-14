import { motion } from "framer-motion";
import FusePageSimple from "@fuse/core/FusePageSimple";
import DashboardAppHeader from "./DashboardAppHeader";
import ChartContainer from "./widgets/ChartContainer";

function DashboardApp() {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<FusePageSimple
			header={<DashboardAppHeader />}
			content={
				<motion.div
					className="grid grid-cols-1 w-full min-w-0 p-24 gap-24"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.div
						variants={item}
						className="grid grid-rows-1 sm:grid-rows-1 gap-24"
					>
						<ChartContainer />
					</motion.div>
				</motion.div>
			}
		/>
	);
}

export default DashboardApp;
