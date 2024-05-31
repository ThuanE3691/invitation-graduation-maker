export type Image = {
	id: number;
	filename: string;
	mimetype: string;
	data: {
		data: Buffer;
	};
};
