import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewController, { ModeController } from "./ViewController";
import BaseView from "@/components/view/BaseView";
import InviterView from "../view/InviterView";
import GuestView from "../view/GuestView";
import SpecialView from "../view/SpecialView";

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
                <Route path={`/user/:inviterName`} element={<InviterView></InviterView>} />
                <Route path={`/user/:inviterName/:guestName`} element={<GuestView></GuestView>} />
                <Route path={`/special/of/owner`} element={<SpecialView></SpecialView>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
