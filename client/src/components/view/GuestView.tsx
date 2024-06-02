import BaseView from "./BaseView";
import ViewController from "../core/ViewController";
import { useParams, useSearchParams } from "react-router-dom";
import { ModeController } from "../core/ViewController";
import { useContext } from "react";
import { ViewContext, ViewContextType } from "../../context/ViewContext";
import { useQuery } from "@tanstack/react-query";
import { BufferToBlob } from "@/lib/utils";
import { Image } from "@/models";

const GuestView = () => {
	const { inviterName, guestName } = useParams<{
		inviterName: string;
		guestName: string;
	}>();
	const {
		inviter,
		users,
		guest,
		setImages,
		formMethod: { setGuestName },
	} = useContext<ViewContextType>(ViewContext);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, _] = useSearchParams();

	const { isPending } = useQuery({
		queryKey: ["user", inviterName, guestName],
		queryFn: async () => {
			const inviterData = await inviter.fetchInviter(inviterName);
			const guestData = await guest.fetchGuest(inviterData ?? null, guestName);
			inviter.setValue(inviterData);
			guest.setValue(guestData);

			const images: Image[] | undefined = guestData?.images?.map((image) => {
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
			setGuestName(guestData?.name || "");
			return guestData;
		},
		enabled: users.value.length > 0,
	});

	if (isPending) {
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
