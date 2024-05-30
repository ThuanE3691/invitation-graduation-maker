import { createContext, useEffect, useState } from "react";
import axios from "../lib/axiosInstance";
import useInput, { useInputType } from "@/hooks/useInput";
import { ImageType, useImage } from "@/hooks/useImage";
import { User } from "@/models";

export type ViewContextType = {
	// viewConfig: JSON;
	// setViewConfig: (viewConfig: JSON) => void;
	nameGuest: useInputType<string>;
	imageOne: ImageType;
	users: {
		value: User[];
		setValue: React.Dispatch<React.SetStateAction<User[]>>;
	};
	inviter: {
		value: User | null;
		setValue: React.Dispatch<React.SetStateAction<User | null>>;
		fetchInviter: (inviterName: string | undefined) => void;
	};
};

export const ViewContext = createContext<ViewContextType>(
	{} as ViewContextType
);

const INITIAL_IMAGE =
	"https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/335652337_1963438520657205_4755322452809463836_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ufWH6RCq8k4Q7kNvgFyJ7id&_nc_ht=scontent.fhan4-5.fna&oh=00_AYB4tkLwss-Ltm74OwIhuwAhNz9EzmzpHmbOzzZC_bIxhA&oe=665A3AB0";

const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
	// const [viewConfig, setViewConfig] = useState({});
	const nameGuest = useInput<string>({ initialValue: "Guest Name" });

	const imageOne = useImage({ initialValue: INITIAL_IMAGE });

	const [users, setUsers] = useState<User[]>([]);

	const [currentInviter, setCurrentInviter] = useState<User | null>(null);

	const fetchUser = async () => {
		await axios
			.get("/user")
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchInviter = async (inviterName: string | undefined) => {
		if (inviterName) {
			const inviter = users.find((user) => user.name === inviterName);
			if (inviter) {
				await axios
					.get(`/user/${inviter?.name}`)
					.then((res) => {
						setCurrentInviter(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const viewContextValue: ViewContextType = {
		// viewConfig,
		// setViewConfig,
		nameGuest,
		imageOne,
		users: {
			value: users,
			setValue: setUsers,
		},
		inviter: {
			value: currentInviter,
			setValue: setCurrentInviter,
			fetchInviter,
		},
	};

	return (
		<ViewContext.Provider value={viewContextValue}>
			{children}
		</ViewContext.Provider>
	);
};

export default ViewContextProvider;
