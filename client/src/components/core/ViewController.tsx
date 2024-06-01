import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { IoSettingsOutline } from "react-icons/io5";
import { Input, Separator } from "@/components/ui";
import { useContext } from "react";
import { ViewContext, ViewContextType } from "@/context/ViewContext";
import ImageUpload from "../feature/ImageUpload";
import InviterSelect from "../feature/InviterSelect";
import GuestSelect from "../feature/GuestSelect";
import { Button } from "../ui/button";
import NewDialog from "../feature/NewDialog";
import { Order } from "@/models";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";

export enum ModeController {
	ADMIN = "ADMIN",
	INVITER = "INVITER",
	GUEST = "GUEST",
}

export type ViewControllerProps = {
	mode: ModeController;
};

const ViewController = ({ mode }: ViewControllerProps) => {
	const { nameGuest, guest, inviter, images } =
		useContext<ViewContextType>(ViewContext);

	const mutation = useMutation({
		mutationFn: async () => {
			const formData = new FormData();
			images.forEach((image) => {
				formData.append("images", image?.file ?? new Blob());
				formData.append("imageOrders", image?.order ?? "");
				formData.append("imageIds", image?.id?.toString());
			});
			formData.append("guestName", nameGuest?.value ?? "");
			formData.append("guestId", guest?.value?.id?.toString() ?? "");
			return await axios.put("/guest/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		},
	});

	return (
		<Sheet>
			<SheetTrigger className="absolute py-4 pl-4">
				<IoSettingsOutline size={32} />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create new invitation page</SheetTitle>
				</SheetHeader>
				<Separator className="my-4" />
				<div className="flex flex-col gap-y-4">
					<SheetHeader>
						<span className="font-medium">Current Inviter</span>
						<InviterSelect></InviterSelect>
					</SheetHeader>
					{mode === ModeController.INVITER && (
						<>
							<SheetHeader>
								<span className="font-medium">List Guest</span>
								<GuestSelect></GuestSelect>
							</SheetHeader>
							<div className="flex gap-x-2 items-center">
								<Separator className=" w-[45%]" />
								<div className="font-medium font-montserrat">OR</div>
								<Separator className=" w-[45%]" />
							</div>
							<NewDialog inviter={inviter.value}></NewDialog>
						</>
					)}
					{mode === ModeController.GUEST && (
						<>
							<SheetHeader>
								<span className="font-medium">Guest Name</span>
								<Input
									value={nameGuest?.value}
									onChange={nameGuest?.onChange}
								></Input>
							</SheetHeader>
							<SheetHeader>
								<span className="font-medium">First Image</span>
								<ImageUpload order={Order.FIRST}></ImageUpload>
							</SheetHeader>
							<SheetHeader>
								<span className="font-medium">Second Image</span>
								<ImageUpload order={Order.SECOND}></ImageUpload>
							</SheetHeader>
							<SheetHeader>
								<span className="font-medium">Third Image</span>
								<ImageUpload order={Order.THIRD}></ImageUpload>
							</SheetHeader>
							<Button onClick={() => mutation.mutate()}>Save</Button>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default ViewController;
