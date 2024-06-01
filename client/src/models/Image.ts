export enum Order {
	FIRST = "First",
	SECOND = "Second",
	THIRD = "Third",
}

export type Image = {
	id: number;
	filename: string;
	mimetype: string;
	data: {
		type: string;
		data: Buffer;
	};
	order: Order;
	url: string;
	file?: File;
};
