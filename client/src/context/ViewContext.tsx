import { createContext, useState } from "react";
import axios from "../lib/axiosInstance";
import useInput, { useInputType } from "@/hooks/useInput";
import { Guest, User, Image, Order } from "@/models";
import { useQuery } from "@tanstack/react-query";

export type ViewContextType = {
	// viewConfig: JSON;
	// setViewConfig: (viewConfig: JSON) => void;
	nameGuest: useInputType<string>;
	users: {
		value: User[];
		setValue: React.Dispatch<React.SetStateAction<User[]>>;
	};
	inviter: {
		value: User | null;
		setValue: React.Dispatch<React.SetStateAction<User | null>>;
		fetchInviter: (inviterName: string | undefined) => Promise<User | null>;
	};
	guest: {
		value: Guest | null;
		setValue: React.Dispatch<React.SetStateAction<Guest | null>>;
		fetchGuest: (
			inviter: User | null,
			guestName: string | undefined
		) => Promise<Guest | null>;
	};
	formMethod: {
		setGuestName: (guestName: string) => void;
	};
	images: Image[];
	setImages: React.Dispatch<React.SetStateAction<Image[]>>;
	updateImage: (image: Image) => void;
};

export const ViewContext = createContext<ViewContextType>(
	{} as ViewContextType
);

const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
	// const [viewConfig, setViewConfig] = useState({});
	const nameGuest = useInput<string>({ initialValue: "Guest Name" });

	const [users, setUsers] = useState<User[]>([]);
	const [currentInviter, setCurrentInviter] = useState<User | null>(null);
	const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
	const [images, setImages] = useState<Image[]>(
		Array.from({ length: 3 }, (_, i) => {
			return {
				order: Order.FIRST,
				data: {
					type: "buffer",
					data: new Blob(["hello world"], { type: "text/plain" }),
				},
				mimetype: "",
				filename: "",
				id: i,
				url: "",
			} as unknown as Image;
		})
	);

	useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const data = await fetchUser();
			setUsers(data);
			return data;
		},
	});

	const fetchUser = async (): Promise<User[]> => {
		return await axios
			.get("/user")
			.then((res) => {
				return res.data;
			})
			.catch(() => {
				return [];
			});
	};

	const fetchInviter = async (
		inviterName: string | undefined
	): Promise<User | null> => {
		if (inviterName) {
			const inviter = users.find((user) => user.name === inviterName);
			return await axios
				.get(`/user/${inviter?.id}`)
				.then((res) => {
					return res.data;
				})
				.catch((err) => {
					console.log(err);
				});
		}
		return null;
	};

	const fetchGuest = async (
		inviter: User | null,
		guestName: string | undefined
	): Promise<Guest | null> => {
		if (inviter && guestName) {
			const guest = inviter?.guests.find((guest) => guest.name === guestName);
			return await axios
				.get(`/guest/${guest?.id}`)
				.then((res) => {
					return res.data.data;
				})
				.catch((err) => {
					console.log(err);
				});
		}
		return null;
	};

	const setGuestName = (guestName: string) => {
		nameGuest.setValue(guestName);
	};

	const updateImage = (image: Image) => {
		setImages((prev) => {
			const newImages = [...prev].map((img) => {
				console.log(prev);
				if (img.order === image.order) {
					img.data = image.data;
					img.mimetype = image.mimetype;
					img.filename = image.filename;
					img.url = image.url;
				}
				return img;
			});
			return newImages;
		});
	};

	const viewContextValue: ViewContextType = {
		// viewConfig,
		// setViewConfig,
		nameGuest,
		users: {
			value: users,
			setValue: setUsers,
		},
		inviter: {
			value: currentInviter,
			setValue: setCurrentInviter,
			fetchInviter,
		},
		guest: {
			value: currentGuest,
			setValue: setCurrentGuest,
			fetchGuest,
		},
		formMethod: {
			setGuestName,
		},
		images,
		setImages,
		updateImage,
	};

	return (
		<ViewContext.Provider value={viewContextValue}>
			{children}
		</ViewContext.Provider>
	);
};

export default ViewContextProvider;
