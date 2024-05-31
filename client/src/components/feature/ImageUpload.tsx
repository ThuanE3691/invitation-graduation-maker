import { ImageType } from "@/hooks/useImage";
import { Input } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import { ViewContext, ViewContextType } from "@/context/ViewContext";
import { useContext } from "react";

const ImageUpload = ({ setImage }: ImageType) => {
	const { guest } = useContext<ViewContextType>(ViewContext);

	const mutation = useMutation({
		mutationFn: async (file: Blob) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("guestId", guest?.value?.id?.toString() ?? "");
			return await axios.post("/guest/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		},
	});

	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0] as Blob;

		if (file) {
			setImage(URL.createObjectURL(file));
			mutation.mutate(file);
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
