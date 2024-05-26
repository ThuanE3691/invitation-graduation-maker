import { createContext, useEffect, useState } from "react";

export const ViewContext = createContext({});

const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [viewConfig, setViewConfig] = useState({});

	const fetchUser = () => {
		fetch("/api/user")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// setViewConfig(data);
			})
			.catch((err) => console.log(err));
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
