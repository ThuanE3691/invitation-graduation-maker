import BaseView from "./BaseView";
import ViewController from "../core/ViewController";
import { useParams } from "react-router-dom";
import { ModeController } from "../core/ViewController";
import { useContext } from "react";
import { ViewContext, ViewContextType } from "../../context/ViewContext";
import { useQuery } from "@tanstack/react-query";

const InviterView = () => {
	const { inviterName } = useParams<{ inviterName: string }>();
	const {
		inviter,
		users: { fetchUser },
		formMethod: { setGuestName },
	} = useContext<ViewContextType>(ViewContext);

	const { isPending } = useQuery({
		queryKey: ["user", inviterName],
		queryFn: async () => {
			const users = await fetchUser();
			const data = await inviter.fetchInviter(users, inviterName);
			inviter.setValue(data);
			setGuestName("GUEST NAME");
			return data;
		},
	});

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<ViewController mode={ModeController.INVITER}></ViewController>
			<BaseView />
		</div>
	);
};

export default InviterView;
