export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	error?: any;
};

export const CreateSuccessApiResponse = <T>(data: T): ApiResponse<T> => {
	return {
		success: true,
		data: data,
		error: null,
	};
};

export const CreateErrorApiResponse = <T>(error: any): ApiResponse<T> => {
	return {
		success: false,
		error: error,
	};
};
