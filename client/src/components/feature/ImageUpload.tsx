import { Input } from "@/components/ui";
import { ViewContext, ViewContextType } from "@/context/ViewContext";
import { useContext } from "react";
import { Image } from "@/models";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { MenuConfig } from "./MenuConfig";

const ImageUpload = ({ image }: { image: Image }) => {
	const { updateImage, setImageInfo } =
		useContext<ViewContextType>(ViewContext);

	const mutation = useMutation({
		mutationFn: async (file: File) => {
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
				order: image.order,
			} as Image);
		}
	};

	return (
		<div className="flex items-center gap-x-2">
			<Input
				type="file"
				id="image-1"
				multiple={false}
				accept="image/*"
				onChange={handleUploadImage}
			></Input>
			<MenuConfig image={image} setImageInfo={setImageInfo}></MenuConfig>
		</div>
	);
};

export default ImageUpload;
