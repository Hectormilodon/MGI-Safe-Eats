import { memo } from "react";
import NotificationPanel from "app/shared-components/notificationPanel/NotificationPanel";
import AnalistsPanel from "app/shared-components/analistsPanel/AnalistsPanel";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";


function RightSideLayout(props) {
	const user = useSelector(selectUser)

	return (
		<>
			<AnalistsPanel />
			<NotificationPanel />
			{/* <ChatPanel /> */}
			{/* <QuickPanel /> */}
		</>
	);
}

export default memo(RightSideLayout);
