import { ImageType } from "@/hooks/useImage";
import { Input } from "@/components/ui";

const ImageUpload = ({ setImage }: ImageType) => {
	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0] as Blob | MediaSource;

		if (file) {
			setImage(URL.createObjectURL(file));
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
