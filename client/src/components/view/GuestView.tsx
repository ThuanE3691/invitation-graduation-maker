import BaseView from "./BaseView";
import ViewController from "../core/ViewController";
import { useParams, useSearchParams } from "react-router-dom";
import { ModeController } from "../core/ViewController";
import { useContext, useEffect } from "react";
import { ViewContext, ViewContextType } from "../../context/ViewContext";
import { BufferToBlob } from "@/lib/utils";
import { Image } from "@/models";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";

const fetchImageById = async (id: number) => {
	const response = await axios.get(`/guest/image/${id}`);
	return response.data.data;
};

const useFetchImages = (ids: number[]) => {
	return useQuery<Image[]>({
		queryKey: ["images", ids],
		queryFn: () => Promise.all(ids.map((id: number) => fetchImageById(id))),
		enabled: ids.length > 0,
		refetchOnWindowFocus: false,
	});
};

const GuestView = () => {
	const { inviterName, guestName } = useParams<{
		inviterName: string;
		guestName: string;
	}>();
	const {
		inviter,
		users: { fetchUser },
		guest,
		setImages,
		formMethod: { setGuestName },
	} = useContext<ViewContextType>(ViewContext);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, _] = useSearchParams();

	const { data: guestData } = useQuery({
		queryKey: ["user", inviterName, guestName],
		queryFn: async () => {
			const users = await fetchUser();
			const inviterData = await inviter.fetchInviter(users, inviterName);
			inviter.setValue(inviterData);
			const guestData = await guest.fetchGuest(inviterData ?? null, guestName);
			guest.setValue(guestData);
			setGuestName(guestData?.name || "");
			return guestData;
		},
		refetchOnWindowFocus: false,
	});

	const { data: listImages, isPending } = useFetchImages(
		guestData?.images?.map((image) => image.id) ?? []
	);

	useEffect(() => {
		if (listImages) {
			const images: Image[] | undefined = listImages?.map((image) => {
				const blob = BufferToBlob(image.data.data, image.mimetype);
				const imageUrl = URL.createObjectURL(blob);
				return {
					id: image.id,
					filename: image.filename,
					mimetype: image.mimetype,
					url: imageUrl,
					order: image.order,
					data: image.data,
					x: image.x,
					y: image.y,
					width: image.width,
					height: image.height,
					rotate: image.rotate,
				} as Image;
			});
			setImages(images ?? []);
		}
	}, [listImages, setImages]);

	if (isPending || listImages?.length === 0) {
		return <div></div>;
	}

	return (
		<div>
			{searchParams.get("displayMode") === "edit" && (
				<ViewController mode={ModeController.GUEST}></ViewController>
			)}
			<BaseView />
		</div>
	);
};

export default GuestView;
