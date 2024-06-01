import { Input } from "@/components/ui";
import { ViewContext, ViewContextType } from "@/context/ViewContext";
import { useContext } from "react";
import { Image, Order } from "@/models";

const ImageUpload = ({ order }: { order: Order }) => {
	const { updateImage } = useContext<ViewContextType>(ViewContext);

	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const url = URL.createObjectURL(file);

			updateImage({
				filename: file.name,
				mimetype: file.type,
				url: url,
				order: order,
				file: file,
			} as Image);
		}
	};

	return (
		<Input
			type="file"
			id="image-1"
			multiple={false}
			accept="image/*"
			onChange={handleUploadImage}
		></Input>
	);
};

export default ImageUpload;
