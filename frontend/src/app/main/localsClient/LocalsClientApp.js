import { motion } from "framer-motion";
import FusePageSimple from "@fuse/core/FusePageSimple";
import LocalList from "./components/LocalList";
import LocalHeader from "./LocalHeader";

function LocalsClientApp() {
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
			header={<LocalHeader />}
			content={
				<motion.div
					className="grid grid-cols-1 w-full min-w-0 p-24 gap-24"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.div variants={item}>
						<LocalList />
					</motion.div>
				</motion.div>
			}
		/>
	);
}

export default LocalsClientApp;
