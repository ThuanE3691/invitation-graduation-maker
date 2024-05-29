import React from "react";

export type useInputProps<T> = {
	initialValue: T;
};

export type useInputType<T> = {
	value: T;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const useInput = <T,>({ initialValue }: useInputProps<T>) => {
	const [value, setValue] = React.useState<T>(initialValue);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value as T);
	};

	return {
		value,
		onChange: handleChange,
	};
};

export default useInput;
