import { Input } from "@/components/ui";
import { ViewContext, ViewContextType } from "@/context/ViewContext";
import { useContext } from "react";
import { Image, Order } from "@/models";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const ImageUpload = ({ order }: { order: Order }) => {
	const { updateImage, images } = useContext<ViewContextType>(ViewContext);

	const mutation = useMutation({
		mutationFn: async (file: File) => {
			const image = images.find((image) => image.order === order);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("imageId", image?.id.toString() ?? "");
			return await axios.put("/guest/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		},
	});

	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const url = URL.createObjectURL(file);

			mutation.mutate(file);

			updateImage({
				filename: file.name,
				mimetype: file.type,
				url: url,
				order: order,
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
