import { createContext, useEffect, useState } from "react";
import axios from "../lib/axiosInstance";

export const ViewContext = createContext({});

const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [viewConfig, setViewConfig] = useState({});

	const fetchUser = () => {
		axios.get("/user").then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const viewContextValue = {
		viewConfig,
		setViewConfig,
	};

	return (
		<ViewContext.Provider value={viewContextValue}>
			{children}
		</ViewContext.Provider>
	);
};

export default ViewContextProvider;
