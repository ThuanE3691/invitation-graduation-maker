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

const ViewController = () => {
	const { nameGuest, imageOne } = useContext<ViewContextType>(ViewContext);

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
				<SheetHeader>
					<SheetTitle>Guest Name</SheetTitle>
					<Input
						value={nameGuest?.value}
						onChange={nameGuest?.onChange}
					></Input>
				</SheetHeader>
				<Separator className="my-4" />
				<SheetHeader>
					<SheetTitle>Image 1</SheetTitle>
					<ImageUpload setImage={imageOne?.setImage}></ImageUpload>
				</SheetHeader>
				<Separator className="my-4" />
				<SheetHeader>
					<SheetTitle>Image 2</SheetTitle>
					<Input type="file" id="image-2"></Input>
				</SheetHeader>
				<Separator className="my-4" />
				<SheetHeader>
					<SheetTitle>Image 3</SheetTitle>
					<Input type="file" id="image-3"></Input>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default ViewController;
