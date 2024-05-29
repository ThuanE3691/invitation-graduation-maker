import { useState } from "react";

export type ImageType = {
	image?: string;
	setImage: (imageUrl: string) => void;
};

export type UseImageProps = {
	initialValue?: string;
};

export const useImage = ({ initialValue }: UseImageProps): ImageType => {
	const [image, setImage] = useState<string>(initialValue ?? "");

	return {
		image,
		setImage,
	} as ImageType;
};
