import BaseView from "./BaseView";
import ViewController from "../core/ViewController";
import { useParams } from "react-router-dom";
import { ModeController } from "../core/ViewController";
import { useContext, useEffect } from "react";
import { ViewContext, ViewContextType } from "../../context/ViewContext";

const InviterView = () => {
	const { inviterName } = useParams<{ inviterName: string }>();
	const { inviter } = useContext<ViewContextType>(ViewContext);

	useEffect(() => {
		inviter.fetchInviter(inviterName);
	}, []);

	return inviter?.value ? (
		<div>
			<ViewController mode={ModeController.INVITER}></ViewController>
			<BaseView />
		</div>
	) : (
		<div>Loading...</div>
	);
};

export default InviterView;
