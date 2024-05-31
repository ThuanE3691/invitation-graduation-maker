import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function BufferToBlob(buffer: Buffer, mimetype: string): Blob {
	const unit8Array = new Uint8Array(buffer);
	return new Blob([unit8Array], { type: mimetype });
}
