import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
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
import { useMutation } from "@tanstack/react-query";
import { QRCodeCanvas } from "qrcode.react";
import axios from "@/lib/axiosInstance";
import {
	getBlobFromImageElement,
	copyBlobToClipboard,
} from "copy-image-clipboard";
import { BiCopy } from "react-icons/bi";

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
			return await axios.put("/guest/update", {
				guestId: guest.value?.id,
				nameGuest: nameGuest.value,
			});
		},
	});

	const onClickCopyQrCode = () => {
		const qrElement = document.getElementById("qr-code");

		if (!qrElement) {
			return;
		}

		getBlobFromImageElement(qrElement as HTMLImageElement)
			.then((blob) => {
				return copyBlobToClipboard(blob);
			})
			.then(() => {
				console.log("Blob Copied");
			})
			.catch((e) => {
				console.log("Error: ", e.message);
			});
	};

	return (
		<Sheet>
			<SheetTrigger className="fixed py-4 pl-4 z-[100]">
				<IoSettingsOutline size={32} />
			</SheetTrigger>
			<SheetPortal>
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
								<div className="flex items-center gap-x-2">
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
									<div className="flex items-center gap-x-2">
										<Input
											value={nameGuest?.value}
											onChange={nameGuest?.onChange}
										></Input>
										<Button variant="outline" onClick={() => mutation.mutate()}>
											Save
										</Button>
									</div>
								</SheetHeader>
								<SheetHeader>
									<span className="font-medium">First Image</span>
									<ImageUpload image={images[0]}></ImageUpload>
								</SheetHeader>
								<SheetHeader>
									<span className="font-medium">Second Image</span>
									<ImageUpload image={images[1]}></ImageUpload>
								</SheetHeader>
								<SheetHeader>
									<span className="font-medium">Third Image</span>
									<ImageUpload image={images[2]}></ImageUpload>
								</SheetHeader>
								<SheetHeader>
									<span className="font-medium">QR Code Generate</span>
									<div className="flex items-center w-full gap-x-4">
										<QRCodeCanvas
											id="qr-code"
											value={`https://graduation-uit.vercel.app/user/${inviter.value?.name}/${guest.value?.name}`}
										></QRCodeCanvas>

										<Button variant="outline" onClick={onClickCopyQrCode}>
											<BiCopy size="24"></BiCopy>
										</Button>
									</div>
								</SheetHeader>
							</>
						)}
					</div>
				</SheetContent>
			</SheetPortal>
		</Sheet>
	);
};

export default ViewController;
