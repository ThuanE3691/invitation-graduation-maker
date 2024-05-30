import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useContext } from "react";
import ViewController from "./ViewController";
import BaseView from "@/components/view/BaseView";
import {ViewContext, ViewContextType} from "@/context/ViewContext";

const AppRouter = () => {

    const { users } = useContext<ViewContextType>(ViewContext);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="relative w-screen h-screen mobile:min-h-[100dvh]">
                            <ViewController></ViewController>
                            <BaseView />
                        </div>
                    }
                />
                <Route>

                </Route>
                {
                    users.value.map((user) => (
                        <Route
                            key={user.id}
                            path={`/user/${user.name}`}
                            element={<div>{user.name}</div>}
                        />
                    ))
                }
            </Routes>
        </Router>
    );
};

export default AppRouter;
