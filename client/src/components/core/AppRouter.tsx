import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewController, { ModeController } from "./ViewController";
import BaseView from "@/components/view/BaseView";
import InviterView from "../view/InviterView";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<div className="relative w-screen h-screen mobile:min-h-[100dvh]">
							<ViewController mode={ModeController.ADMIN}></ViewController>
							<BaseView />
						</div>
					}
				/>
				<Route
					path={`/user/:inviterName`}
					element={<InviterView></InviterView>}
				/>
				{/* <Route
					path={`/user/:inviterName/:guestName`}
					element={
						<div className="relative w-screen h-screen mobile:min-h-[100dvh]">
							<ViewController></ViewController>
							<BaseView />
						</div>
					}
					key={location.pathname}
				/> */}
			</Routes>
		</Router>
	);
};

export default AppRouter;
