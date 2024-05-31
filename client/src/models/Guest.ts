import { Image } from "./Image";

export type Guest = {
	id: number;
	name: string;
	imageOne: string;
	imageTwo: string;
	imageThree: string;
	pageUrl: string;
	images: Image[];
};
